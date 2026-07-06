const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, optionalProtect, authorize } = require('../middleware/auth');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// POST place order (authenticated user or guest checkout)
router.post('/', optionalProtect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, guestCustomer } = req.body;
    if (!items || !items.length || !shippingAddress) {
      return res.status(400).json({ message: 'Order items and shipping address are required' });
    }

    if (!req.user) {
      if (!guestCustomer || !guestCustomer.name || !guestCustomer.email || !guestCustomer.phone || !guestCustomer.address) {
        return res.status(400).json({ message: 'Guest name, email, phone, and address are required' });
      }
    }

    let totalAmount = 0;
    const orderItems = [];

    // Calculate total price and verify products
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for product: ${product.title}` });
      }

      // Deduct stock
      product.stock -= item.quantity;
      product.sales += item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = new Order({
      user: req.user ? req.user._id : undefined,
      guestCustomer: req.user ? undefined : guestCustomer,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: 'unpaid',
    });

    await order.save();
    
    let clientSecret = undefined;

    if (paymentMethod === 'card') {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(totalAmount * 100), // in cents
          currency: 'usd',
          metadata: {
            orderId: order._id.toString()
          }
        });
        order.paymentIntentId = paymentIntent.id;
        await order.save();
        clientSecret = paymentIntent.client_secret;
      } catch (stripeError) {
        console.error('Stripe PaymentIntent creation failed:', stripeError.message);
        // Rollback product stock changes
        for (const item of items) {
          const product = await Product.findById(item.productId);
          if (product) {
            product.stock += item.quantity;
            product.sales -= item.quantity;
            await product.save();
          }
        }
        // Remove pending order
        await Order.findByIdAndDelete(order._id);
        return res.status(500).json({ message: 'Payment gateway initialization failed', error: stripeError.message });
      }
    }

    // Populate product details in returned order
    const populatedOrder = await Order.findById(order._id)
      .populate('items.product')
      .populate('user', 'name email');

    res.status(201).json({
      order: populatedOrder,
      clientSecret
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// GET all orders (Admin only)
router.get('/', protect, authorize('Admin'), async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('items.product')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// GET user's own orders (Protected)
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// PUT update order status (Admin only)
router.put('/:id/status', protect, authorize('Admin'), async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Dispatched', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    
    const populated = await Order.findById(order._id)
      .populate('items.product')
      .populate('user', 'name email');

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
