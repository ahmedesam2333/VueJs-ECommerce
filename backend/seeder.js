const dns = require('dns');
// Use Google DNS to resolve MongoDB Atlas SRV connection issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
const Order = require('./src/models/Order');
const Coupon = require('./src/models/Coupon');
const Review = require('./src/models/Review');

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '.env') });

const categoriesData = [
  { name: 'Action Cameras', description: 'Capture your adventures in high definition' },
  { name: 'Smart Watches', description: 'Stay connected and track your fitness' },
  { name: 'Headphones', description: 'Immersive sound and noise cancellation' },
  { name: 'Drones', description: 'Take to the skies and capture stunning aerial footage' },
  { name: 'Mobile Accessories', description: 'Essential additions for your devices' }
];

const testimonialsData = [
  {
    name: 'Bruno Chamberlain',
    rating: 5,
    comment: "I stumbled upon this tech store while searching for a new laptop, and I couldn't be happier with my experience! The staff was incredibly knowledgeable and guided me through the process of choosing the perfect device for my needs. Highly recommended!"
  },
  {
    name: 'Thomas John',
    rating: 5,
    comment: "This tech store is my go-to for all things tech! Whether it's a new smartphone, accessories, or even troubleshooting advice, they've always got me covered. The staff is friendly, and their expertise is unmatched. Trust me, you won't regret shopping here!"
  },
  {
    name: 'Kevin Bryan',
    rating: 5,
    comment: "I recently purchased a smartwatch from this tech store, and I'm absolutely thrilled with my purchase! Not only did they have an extensive selection to choose from, but their team helped me find the perfect fit for my lifestyle."
  }
];

const couponsData = [
  { code: 'WELCOME10', discountType: 'percentage', discountValue: 10, isActive: true },
  { code: 'SAVE20', discountType: 'percentage', discountValue: 20, isActive: true },
  { code: 'FLAT50', discountType: 'fixed', discountValue: 50, isActive: true }
];

const runSeeder = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();

    console.log('\nCleaning existing database collections...');
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Category.deleteMany({}),
      Order.deleteMany({}),
      Coupon.deleteMany({}),
      Review.deleteMany({})
    ]);
    console.log('Database cleared.');

    // 1. Seed Testimonials (Reviews)
    console.log('Seeding global testimonials...');
    await Review.insertMany(testimonialsData);

    // 2. Seed Coupons
    console.log('Seeding discount coupons...');
    await Coupon.insertMany(couponsData);

    // 3. Seed Users
    console.log('Seeding users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@shoplite.com',
      password: hashedPassword,
      role: 'Admin',
      phone: '1234567890',
      address: '123 Admin Lane, Washington DC'
    });

    const seller = await User.create({
      name: 'Seller User',
      email: 'seller@shoplite.com',
      password: hashedPassword,
      role: 'Seller',
      phone: '1234567891',
      address: '456 Seller Blvd, Seattle WA'
    });

    const customer = await User.create({
      name: 'Customer User',
      email: 'customer@shoplite.com',
      password: hashedPassword,
      role: 'Customer',
      phone: '1234567892',
      address: '789 Customer Road, Orlando FL'
    });

    console.log('Core users created successfully.');

    // 4. Seed Categories
    console.log('Seeding product categories...');
    const categoriesMap = {};
    for (const cat of categoriesData) {
      const created = await Category.create({
        name: cat.name,
        description: cat.description,
        image: `https://picsum.photos/seed/${cat.name.replace(/\s+/g, '')}/500/500`
      });
      categoriesMap[cat.name] = created._id;
    }

    // 5. Seed Products
    console.log('Seeding products...');
    const productsData = [
      // Action Cameras
      {
        title: 'GoPro HERO12 Black',
        description: 'Incredible image quality, even better HyperSmooth video stabilization and a huge boost in battery life. HERO12 Black takes best-in-class 5.3K video and adds HDR for more detail.',
        price: 399.99,
        stock: 15,
        brand: 'GoPro',
        category: categoriesMap['Action Cameras'],
        thumbnail: 'https://picsum.photos/seed/gopro12/600/600',
        images: ['https://picsum.photos/seed/gopro12/600/600'],
        rating: 4.8,
        sales: 45,
        isFeatured: true
      },
      {
        title: 'DJI Osmo Action 4',
        description: 'With a 1/1.3-inch sensor, low-light performance is unmatched. Shoot stunning 4K/120fps video and capture details in highlights and shadows with native 10-bit color.',
        price: 329.99,
        stock: 20,
        brand: 'DJI',
        category: categoriesMap['Action Cameras'],
        thumbnail: 'https://picsum.photos/seed/osmoaction/600/600',
        images: ['https://picsum.photos/seed/osmoaction/600/600'],
        rating: 4.7,
        sales: 30,
        isFeatured: false
      },
      // Smart Watches
      {
        title: 'Apple Watch Series 9',
        description: 'Smarter, brighter, and faster. Features the S9 SiP chip, double tap gesture interaction, and a brighter display. Advanced health, safety, and activity features.',
        price: 399.00,
        stock: 25,
        brand: 'Apple',
        category: categoriesMap['Smart Watches'],
        thumbnail: 'https://picsum.photos/seed/applewatch9/600/600',
        images: ['https://picsum.photos/seed/applewatch9/600/600'],
        rating: 4.9,
        sales: 120,
        isFeatured: true
      },
      {
        title: 'Samsung Galaxy Watch 6',
        description: 'Track your health and wellness with a personalized sleep coach, heart rate zone mapping, and body composition analysis. Sleek rotating bezel and customizable faces.',
        price: 299.99,
        stock: 18,
        brand: 'Samsung',
        category: categoriesMap['Smart Watches'],
        thumbnail: 'https://picsum.photos/seed/galaxywatch6/600/600',
        images: ['https://picsum.photos/seed/galaxywatch6/600/600'],
        rating: 4.6,
        sales: 85,
        isFeatured: false
      },
      // Headphones
      {
        title: 'Sony WH-1000XM5',
        description: 'Industry-leading noise cancellation. Exceptional sound quality with High-Res Audio. Crystal clear hands-free calling and up to 30-hour battery life.',
        price: 348.00,
        stock: 30,
        brand: 'Sony',
        category: categoriesMap['Headphones'],
        thumbnail: 'https://picsum.photos/seed/sonywh/600/600',
        images: ['https://picsum.photos/seed/sonywh/600/600'],
        rating: 4.9,
        sales: 140,
        isFeatured: true
      },
      {
        title: 'Bose QuietComfort Ultra',
        description: 'World-class active noise cancellation with breakthrough spatialized audio. Customizable sound profiles, long-lasting comfort, and up to 24 hours of playback.',
        price: 429.00,
        stock: 12,
        brand: 'Bose',
        category: categoriesMap['Headphones'],
        thumbnail: 'https://picsum.photos/seed/boseqc/600/600',
        images: ['https://picsum.photos/seed/boseqc/600/600'],
        rating: 4.8,
        sales: 75,
        isFeatured: true
      },
      // Drones
      {
        title: 'DJI Mini 4 Pro',
        description: 'Under 249g, no registration required. 4K/60fps HDR true vertical shooting, omnidirectional active obstacle sensing, and 34-minute flight time.',
        price: 759.00,
        stock: 8,
        brand: 'DJI',
        category: categoriesMap['Drones'],
        thumbnail: 'https://picsum.photos/seed/djimini4/600/600',
        images: ['https://picsum.photos/seed/djimini4/600/600'],
        rating: 4.9,
        sales: 22,
        isFeatured: true
      },
      {
        title: 'DJI Air 3 Fly More Combo',
        description: 'Dual-primary camera system with medium telephoto and wide-angle. Omnidirectional obstacle sensing, 46 minutes of flight time, and O4 HD video transmission.',
        price: 1349.00,
        stock: 5,
        brand: 'DJI',
        category: categoriesMap['Drones'],
        thumbnail: 'https://picsum.photos/seed/djiair3/600/600',
        images: ['https://picsum.photos/seed/djiair3/600/600'],
        rating: 4.8,
        sales: 15,
        isFeatured: false
      },
      // Mobile Accessories
      {
        title: 'Anker Prime 20000mAh Power Bank',
        description: 'Ultra-high capacity power bank with 200W total output. Smart digital display shows power levels, recharging speeds, and health metrics.',
        price: 129.99,
        stock: 50,
        brand: 'Anker',
        category: categoriesMap['Mobile Accessories'],
        thumbnail: 'https://picsum.photos/seed/ankerpower/600/600',
        images: ['https://picsum.photos/seed/ankerpower/600/600'],
        rating: 4.7,
        sales: 210,
        isFeatured: false
      },
      {
        title: 'Belkin 3-in-1 Wireless Charger',
        description: 'Charge your Apple devices faster with this premium magnetic charging stand. Charges Apple Watch, iPhone, and AirPods simultaneously.',
        price: 149.99,
        stock: 22,
        brand: 'Belkin',
        category: categoriesMap['Mobile Accessories'],
        thumbnail: 'https://picsum.photos/seed/belkincharger/600/600',
        images: ['https://picsum.photos/seed/belkincharger/600/600'],
        rating: 4.5,
        sales: 95,
        isFeatured: false
      }
    ];

    const seededProducts = [];
    for (const p of productsData) {
      const created = await Product.create({
        ...p,
        name: p.title,
        image: p.thumbnail,
        originalPrice: p.price,
        discountPercentage: 0,
        isOnSale: false,
        sku: `SKU-${p.title.toUpperCase().replace(/\s+/g, '-')}`
      });
      seededProducts.push(created);
    }
    console.log(`${seededProducts.length} products created successfully.`);

    // 6. Seed Mock Orders
    console.log('Seeding mock orders for transaction history...');
    const ordersData = [
      {
        user: customer._id,
        items: [
          { product: seededProducts[2]._id, quantity: 1, price: seededProducts[2].price }, // Apple Watch S9
          { product: seededProducts[4]._id, quantity: 1, price: seededProducts[4].price }  // Sony WH-1000XM5
        ],
        totalAmount: seededProducts[2].price + seededProducts[4].price,
        shippingAddress: 'Customer User, 789 Customer Road, Orlando FL, Phone: 1234567892',
        paymentMethod: 'card',
        paymentStatus: 'paid',
        paymentIntentId: 'pi_seeded_mock_1',
        status: 'Delivered',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        user: customer._id,
        items: [
          { product: seededProducts[0]._id, quantity: 1, price: seededProducts[0].price } // GoPro HERO12
        ],
        totalAmount: seededProducts[0].price,
        shippingAddress: 'Customer User, 789 Customer Road, Orlando FL, Phone: 1234567892',
        paymentMethod: 'cod',
        paymentStatus: 'unpaid',
        status: 'Pending',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        user: customer._id,
        items: [
          { product: seededProducts[8]._id, quantity: 2, price: seededProducts[8].price } // Anker Power bank
        ],
        totalAmount: seededProducts[8].price * 2,
        shippingAddress: 'Customer User, 789 Customer Road, Orlando FL, Phone: 1234567892',
        paymentMethod: 'card',
        paymentStatus: 'paid',
        paymentIntentId: 'pi_seeded_mock_2',
        status: 'Dispatched',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
      }
    ];

    await Order.insertMany(ordersData);
    console.log('Mock orders created.');

    console.log('\nSeeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

runSeeder();
