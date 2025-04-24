const express = require('express');
const { getHostels, createHostel } = require('../controllers/hostelsController');
const router = express.Router();

router.get('/', getHostels);
router.post('/', createHostel);

module.exports = router;
