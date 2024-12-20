const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // URL to plant image
  type: { type: String }, // Example: Indoor, Outdoor, etc.
  wateringFrequency: { type: String }, // Example: "Once a week"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plant', PlantSchema);