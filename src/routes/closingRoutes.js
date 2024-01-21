// closingRoutes.js
const express = require('express');
const closingController = require('../controllers/closingController');

const router = express.Router();

router.post('/saveClosing', closingController.saveClosing);
router.get('/getAllClosing', closingController.getAllClosing);

module.exports = router;
