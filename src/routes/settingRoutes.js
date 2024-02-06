<<<<<<< HEAD
// settingRoutes.js

const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');

// Routes related to user settings
router.get('/settings', settingController.getUserSettings);
router.put('/settings', settingController.updateUserSettings);

module.exports = router;
=======
// settingRoutes.js

const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');

// Routes related to user settings
router.get('/settings', settingController.getUserSettings);
router.put('/settings', settingController.updateUserSettings);

module.exports = router;
>>>>>>> 2c2e4ab06074b0f32b83f4269ac4a737b98d0225
