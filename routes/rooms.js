const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../controllers/roomsController');

// List all rooms
router.get('/', getAllRooms);
// Get room by ID
router.get('/:id', getRoomById);
// Create a new room
router.post('/', createRoom);
// Update a room
router.put('/:id', updateRoom);
// Delete a room
router.delete('/:id', deleteRoom);

module.exports = router;
