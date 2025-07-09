const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register new user
router.post('/signup', userController.register);

// Get all users
router.get('/users', userController.getAll);

module.exports = router; 