const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route to get all comments
router.get('/', commentController.getAllComments);

module.exports = router;
