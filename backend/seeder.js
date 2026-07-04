const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');
const Review = require('./src/models/Review');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();
    await Review.deleteMany();

    // 1. Create Categories
    const categories = await Category.insertMany([
      { name: 'Phones' },
      { name: 'PlayStation' },
      { name: 'Smart Watches' },
      { name: 'Headsets' },
      { name: 'Earbuds' },
      { name: 'Laptops' },
    ]);

    // 2. Create Products
    const baseProducts = [
      {
        name: 'MacBook Pro',
        description: 'Apple MacBook Pro',
        price: 1299,
        category: categories[5]._id,
        sales: 100,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Wireless Earphones',
        description: 'High quality wireless earphones',
        price: 259,
        category: categories[4]._id,
        sales: 90,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Apple Watch Series 6',
        description: 'Apple Watch Series 6',
        price: 459,
        category: categories[2]._id,
        sales: 150,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Curved Monitor 32"',
        description: 'Ultra wide curved monitor',
        price: 350,
        category: categories[5]._id,
        sales: 120,
        isFeatured: false,
        isOnSale: false,
      },
      // Featured Products
      { name: 'Wireless Headset', description: 'desc', price: 29.99, category: categories[3]._id, isFeatured: true },
      { name: 'Apple TV 4K 64GB', description: 'desc', price: 199.00, category: categories[1]._id, isFeatured: true },
      { name: 'AirPods Pro', description: 'desc', price: 249.00, category: categories[4]._id, isFeatured: true },
      // On Sale
      { name: 'iPhone 13 Pro Max', description: 'desc', price: 999, originalPrice: 1199, category: categories[0]._id, isOnSale: true },
      { name: '24-inch iMac', description: 'desc', price: 1299, originalPrice: 1499, category: categories[5]._id, isOnSale: true },
      { name: 'Smart CCTV Camera', description: 'desc', price: 149, originalPrice: 199, category: categories[1]._id, isOnSale: true },
    ];

    const productsWithImages = baseProducts.map((p, index) => {
      const keyword = encodeURIComponent(p.name.split(' ')[0].toLowerCase());
      return {
        ...p,
        image: `https://loremflickr.com/500/500/technology,gadget,${keyword}?lock=${index + 1}`
      };
    });

    await Product.insertMany(productsWithImages);

    // 3. Create Reviews
    await Review.insertMany([
      { name: 'Emma Chamberlin', rating: 5, comment: 'I stumbled upon this tech store while searching for a new laptop, and I couldn\'t be happier with my experience! The staff was incredibly knowledgeable and guided me through the process of choosing the perfect device for my needs. Highly recommended!' },
      { name: 'Thomas John', rating: 5, comment: 'This tech store is my go-to for all things tech! Whether it\'s a new smartphone accessory, or even troubleshooting advice, they\'ve always got me covered. The staff is friendly, and their expertise is unmatched. Trust me; you won\'t regret shopping here!' },
      { name: 'Kevin Bryan', rating: 5, comment: 'I recently purchased a smartwatch from this tech store, and I\'m absolutely thrilled with my purchase! Not only did they have an extensive selection to choose from, but their team helped me find the perfect fit for my lifestyle.' },
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();
