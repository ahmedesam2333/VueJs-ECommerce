const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

const router = express.Router();

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;

      if (orderId) {
        const order = await Order.findById(orderId);
        if (order) {
          order.paymentStatus = 'paid';
          await order.save();
          console.log(`Order ${orderId} successfully marked as PAID via webhook`);
        } else {
          console.warn(`Order ${orderId} not found for payment_intent.succeeded`);
        }
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;

      if (orderId) {
        const order = await Order.findById(orderId);
        if (order) {
          order.paymentStatus = 'failed';
          await order.save();
          console.log(`Order ${orderId} marked as FAILED via webhook`);
        } else {
          console.warn(`Order ${orderId} not found for payment_intent.payment_failed`);
        }
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Error handling webhook event:', err.message);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

module.exports = router;
