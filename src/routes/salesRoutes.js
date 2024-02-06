<<<<<<< HEAD
// src/routes/salesRoutes.js

const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// Routes for fetching category names, products, and saving sales data
router.get('/categories', salesController.fetchCategoryNames);
router.get('/api/products', salesController.fetchProductsByCategory);
router.post('/saveSalesToDatabase', salesController.saveSalesToDatabase);
router.get('/fetchSalesData', salesController.fetchSalesData); // Add this line
router.delete('/deleteSalesData', salesController.deleteSalesData);


module.exports = router;
=======
// src/routes/salesRoutes.js

const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// Routes for fetching category names, products, and saving sales data
router.get('/categories', salesController.fetchCategoryNames);
router.get('/api/products', salesController.fetchProductsByCategory);
router.post('/saveSalesToDatabase', salesController.saveSalesToDatabase);
router.get('/fetchSalesData', salesController.fetchSalesData); // Add this line
router.delete('/deleteSalesData', salesController.deleteSalesData);


module.exports = router;
>>>>>>> 2c2e4ab06074b0f32b83f4269ac4a737b98d0225
