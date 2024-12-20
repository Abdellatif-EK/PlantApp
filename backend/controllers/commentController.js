const Comment = require('../models/commentModel'); // Import Comment model

// Method to get all comments
exports.getAllComments = async (req, res) => {
  try {
    // Fetch all comments and populate user and post data
    const comments = await Comment.find()
      .populate('user', 'name email') // Populate user details (name and email)
      .populate('postId', 'title content') // Populate post details (title and content)
      .exec();

    res.status(200).json({
      message: 'All comments fetched successfully',
      comments,
    });
  } catch (error) {
    console.error('Error fetching all comments:', error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
