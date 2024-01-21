// routes/inventoryRoutes.js

const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.post('/saveToDatabase', inventoryController.saveToDatabase);
router.get('/fetchProductNames', inventoryController.fetchProductNames);
router.get('/fetchSupplierNames', inventoryController.fetchSupplierNames);
router.get('/fetchInventoryData', inventoryController.fetchInventoryData);


module.exports = router;
