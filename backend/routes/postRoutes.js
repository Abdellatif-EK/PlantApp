const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const postsController = require('../controllers/postController');

// Define the route for creating a post
router.post('/create', upload.single('image'), postsController.createPost); // Using 'upload.single('image')' for image upload

router.get('/get-image', postsController.getImage); // to run for /uploads\image-1734413919603-668960758.jpg. localhost:5000/api/posts/get-image/uploads\image-1734413919603-668960758.jpg

// Define the route for adding a comment to a post
router.post('/add-comment', postsController.addComment);

router.get('/', postsController.getAllPosts);

// Route to get a single post by ID
router.get('/:id', postsController.getPostById);

// Route to get comments for a post
router.get('/:id/comments', postsController.getPostComments);

module.exports = router;