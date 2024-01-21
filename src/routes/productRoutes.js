// Example in your productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/categories', productController.getCategories);
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
// router.put('/:sku', productController.editProduct); // Updated route for editing
router.delete('/:sku', productController.deleteProduct); // Updated route for deleting

module.exports = router;
