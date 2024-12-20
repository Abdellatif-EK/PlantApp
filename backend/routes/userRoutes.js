const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
// Get user by ID
router.get('/:id', userController.getUserById);
// Update user information
router.put('/:id', userController.updateUser);
// Reset password
router.post('/:id/reset-password', userController.resetPassword);

module.exports = router;
