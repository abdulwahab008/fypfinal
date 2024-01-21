const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');

const productRoutes = require('./src/routes/productRoutes');
const salesRoutes = require('./src/routes/salesRoutes');
const supplierRoutes = require('./src/routes/supplierRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const userRoutes = require('./src/routes/userRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const giveloanRoutes = require('./src/routes/giveloanRoutes'); 
const receiveloanRoutes = require('./src/routes/receiveloanRoutes'); 
const commissionRoutes = require('./src/routes/commissionRoutes');
const closingRoutes = require('./src/routes/closingRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(session({
    secret: 'c9e1f0ae837b4a29268b4d0f1261f7f8e93b2ce6aae94827f8947e4a59c894a6',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Product routes
app.use('/api/products', productRoutes);

// Sales, Suppliers, and Categories routes
app.use('/api/sales', salesRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/categories', categoryRoutes);

// User authentication routes
app.use('/api/users', userRoutes);

// Customer routes
app.use('/customers', customerRoutes);

// Giveloan routes
app.use('/giveloans', giveloanRoutes);

// Inventory routes
app.use('/', inventoryRoutes);
app.use('/receiveloans', receiveloanRoutes);

app.use('/api/commissions', commissionRoutes);
app.use('/api/closings', closingRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Endpoints: /api/products, /api/sales, /suppliers, /categories, /api/users, /customers, /giveloans, /inventory`);
});
