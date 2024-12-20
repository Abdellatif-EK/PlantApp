const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');

// Routes
router.post('/create', plantController.createPlant); // Create a standalone plant
router.post('/associate', plantController.associatePlantWithUser); // Associate plant with user
router.post('/disassociate', plantController.disassociatePlant); // Associate plant with user
router.get('/user/:userId', plantController.getUserPlants); // Get all plants for a user
router.put('/:plantId', plantController.modifyPlant); // Modify a plant
router.get('/:plantId', plantController.getPlantById); // Get a plant by ID
router.delete('/:plantId', plantController.deletePlant); // Delete a plant
router.get('/', plantController.getAllPlants); // Get all plants

module.exports = router;
