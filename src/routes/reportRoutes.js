<<<<<<< HEAD
// reportRoutes.js
const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

router.post('/generateReport', reportController.generateReport);

module.exports = router;
=======
// reportRoutes.js
const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

router.post('/generateReport', reportController.generateReport);

module.exports = router;
>>>>>>> 2c2e4ab06074b0f32b83f4269ac4a737b98d0225
