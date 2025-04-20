const express = require('express');
const router = express.Router();
const { getHostels, createHostel } = require('../controllers/hostelController');

// Route to fetch all hostels
router.get('/', getHostels);

// Route to create a new hostel
router.post('/', createHostel);

module.exports = router;