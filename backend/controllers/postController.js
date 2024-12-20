const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');

exports.createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = '67610e5f081e9a546da293f6'; // Hardcoded user ID
      const imagePath = req.file ? req.file.path : null;
  
      const post = new Post({
        title,
        content: content,
        user: userId, // Add the user ID to the post
        image: imagePath,
        comments: [],
      });
  
      await post.save();
  
      res.status(201).json({ message: 'Post created successfully', post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create post', details: err.message });
    }
  };

exports.getImage = (req, res) => {
    const imagePath = req.query.image;
    if (imagePath) {
        res.sendFile(imagePath, { root: './' });
    } else {
        res.status(400).json({ error: 'Image path is required' });
    }
};

  
  // Add a comment to a post
exports.addComment = async (req, res) => {
    try {
      const { postId, userId, content } = req.body;
  
      // Check if the post exists
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Create a new comment
      const newComment = new Comment({
        content,
        user: userId, // User who wrote the comment
        postId: postId, // Link the comment to the post
      });
  
      // Save the comment to the database
      const savedComment = await newComment.save();
  
      // Push the new comment's ID into the post's comments array
      post.comments.push(savedComment._id);
      await post.save();
  
      res.status(201).json({
        message: 'Comment added successfully',
        comment: savedComment,
      });
    } catch (err) {
      console.error('Error adding comment:', err.message);
      res.status(500).json({ error: 'Failed to add comment', details: err.message });
    }
  };
  
  

  exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate('user', 'name email'); // Populating user details
      const postsWithImages = posts.map(post => {
        // Constructing the full image URL
        const imageUrl = `http://localhost:3000/${post.image}`;
        return {
          ...post.toObject(),
          imageUrl,  // Adding the image URL to the post object
        };
      });
      res.json({ posts: postsWithImages });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Method to get a single post by ID
exports.getPostById = async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Find the post by ID and populate user details
      const post = await Post.findById(postId).populate('user', 'name email');
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Constructing the full image URL
      const imageUrl = `http://localhost:3000/${post.image}`;
      const postWithImage = {
        ...post.toObject(),
        imageUrl,  // Adding the image URL to the post object
      };
  
      res.json({ post: postWithImage });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Method to get comments for a specific post
exports.getPostComments = async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Find all comments related to the post ID
      const comments = await Comment.find({ postId })
        .populate('user', 'name email') // Populate user info (name, email)
        .exec();
  
      res.status(200).json({ comments });
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};
  
  