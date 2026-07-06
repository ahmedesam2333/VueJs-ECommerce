const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors());

// Webhook route must be parsed as raw body for Stripe signature validation
app.post('/api/orders/webhook', express.raw({ type: 'application/json' }), require('./src/routes/ordersWebhook'));

app.use(express.json());

// Routes
app.use('/api/config', require('./src/routes/config'));
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/categories', require('./src/routes/categories'));
app.use('/api/products', require('./src/routes/products'));
app.use('/api/orders', require('./src/routes/orders'));
app.use('/api/coupons', require('./src/routes/coupons'));
app.use('/api/reviews', require('./src/routes/reviews'));
app.use('/api/home', require('./src/routes/home'));
app.use('/api/about', require('./src/routes/about'));
app.use('/api/contact', require('./src/routes/contact'));

app.get('/', (req, res) => {
  res.send('ShopLite API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
