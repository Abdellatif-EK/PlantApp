const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      content: { type: String,required: true },
      image: { type: String}, // URL to post image
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the author (User)
      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of comments
    },
    {
      collection: 'Posts',
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );

module.exports = mongoose.model('Post', PostSchema);