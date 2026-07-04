const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET products for Home page sections (Best Selling, Featured, Latest, On Sale)
router.get('/', async (req, res) => {
  try {
    let query = {};

    // Filter by Featured, OnSale
    if (req.query.isFeatured) query.isFeatured = req.query.isFeatured === 'true';
    if (req.query.isOnSale) query.isOnSale = req.query.isOnSale === 'true';

    let mongooseQuery = Product.find(query);

    // Sorting
    if (req.query.sort) {
      if (req.query.sort === '-sales') {
        mongooseQuery = mongooseQuery.sort({ sales: -1 }); // Best selling
      } else if (req.query.sort === '-createdAt') {
        mongooseQuery = mongooseQuery.sort({ createdAt: -1 }); // Latest
      }
    }

    // Limit (e.g. 3 for columns, 4 for best selling)
    if (req.query.limit) {
      mongooseQuery = mongooseQuery.limit(Number(req.query.limit));
    }

    const products = await mongooseQuery;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
