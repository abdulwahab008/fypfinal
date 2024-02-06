<<<<<<< HEAD
// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Signup route
router.post('/signup', UserController.signup);

// Login route
router.post('/login', UserController.login);
router.post('/change-password', UserController.changePassword);
router.get('/current', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ user: req.session.user });
    } else {
        res.status(401).json({ error: 'User not authenticated' });
    }
});
router.post('/logout', UserController.logout);
module.exports = router;
=======
// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Signup route
router.post('/signup', UserController.signup);

// Login route
router.post('/login', UserController.login);
router.get('/current', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ user: req.session.user });
    } else {
        res.status(401).json({ error: 'User not authenticated' });
    }
});
module.exports = router;
>>>>>>> 2c2e4ab06074b0f32b83f4269ac4a737b98d0225
