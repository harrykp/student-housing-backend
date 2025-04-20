const express = require('express');
const router = express.Router();
const { getRooms, addRoom, getOccupants } = require('../controllers/roomController');

// Route to get all rooms
router.get('/', getRooms);

// Route to add a new room
router.post('/', addRoom);

// Route to get occupants of a room
router.get('/:roomId/occupants', getOccupants);

module.exports = router;