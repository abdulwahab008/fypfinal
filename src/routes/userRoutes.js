// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Signup route
router.post('/signup', UserController.signup);

// Login route
router.post('/login', UserController.login);

module.exports = router;
