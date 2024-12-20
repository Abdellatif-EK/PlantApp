const Plant = require('../models/plantModel');
const User = require('../models/userModel');

// Create a standalone plant
exports.createPlant = async (req, res) => {
  const { name, description, image, type, wateringFrequency } = req.body;

  try {
    // Create new plant
    const newPlant = await Plant.create({
      name,
      description,
      image,
      type,
      wateringFrequency,
    });

    res.status(201).json({ status: 'ok', data: newPlant });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.associatePlantWithUser = async (req, res) => {
    const { userId, plantId } = req.body;
  
    try {
      // Step 1: Find user and populate their plants
      const user = await User.findById(userId).populate('plants');
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }
  
      // Step 2: Ensure the plant is not already associated
      const isAlreadyAssociated = user.plants.some(plant => plant._id.toString() === plantId);
      if (isAlreadyAssociated) {
        return res.status(400).json({ status: 'error', message: 'Plant already exists in your garden' });
      }
  
      // Step 3: Add plant to user's list and save
      user.plants.push(plantId);
      await user.save();
  
      res.status(200).json({ status: 'ok', message: 'Plant associated successfully', data: user.plants });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };
  

// Fetch all plants for a specific user
exports.getUserPlants = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('plants');
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.status(200).json({ status: 'ok', data: user.plants });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};


// Method to modify a plant
exports.modifyPlant = async (req, res) => {
    const { plantId } = req.params; // ID of the plant to modify
    const { name, description, image,type,wateringFrequency } = req.body; // Fields to update
  
    try {
      const updatedPlant = await Plant.findByIdAndUpdate(
        plantId,
        { name, description, image,type,wateringFrequency },
        { new: true, runValidators: true }
      );
  
      if (!updatedPlant) {
        return res.status(404).json({ status: 'error', message: 'Plant not found' });
      }
  
      res.status(200).json({ status: 'ok', message: 'Plant updated successfully', data: updatedPlant });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };
  
  // Method to get a plant by its ID
  exports.getPlantById = async (req, res) => {
    const { plantId } = req.params;
  
    try {
      const plant = await Plant.findById(plantId);
      if (!plant) {
        return res.status(404).json({ status: 'error', message: 'Plant not found' });
      }
  
      res.status(200).json({ status: 'ok', data: plant });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };
  
  // Method to delete a plant
  exports.deletePlant = async (req, res) => {
    const { plantId } = req.params;
  
    try {
      const deletedPlant = await Plant.findByIdAndDelete(plantId);
  
      if (!deletedPlant) {
        return res.status(404).json({ status: 'error', message: 'Plant not found' });
      }
  
      res.status(200).json({ status: 'ok', message: 'Plant deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };
  

  // Method to get all plants
exports.getAllPlants = async (req, res) => {
    try {
      const plants = await Plant.find(); // Retrieve all plants
      res.status(200).json({ status: 'ok', data: plants });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };
  
// Method to disassociate a plant from a user
exports.disassociatePlant = async (req, res) => {
    try {
      const { userId, plantId } = req.body;
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }
  
      // Check if the plant exists in the user's list
      if (!user.plants.includes(plantId)) {
        return res.status(404).json({
          status: 'error',
          message: 'Plant not associated with this user',
        });
      }
  
      // Remove the plant from the user's list
      user.plants = user.plants.filter((id) => id.toString() !== plantId);
      await user.save();
  
      res.status(200).json({
        status: 'ok',
        message: 'Plant disassociated successfully',
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  };
  