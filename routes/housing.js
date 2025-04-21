const express = require('express');
const router = express.Router();
const { getHousingOptions } = require('../controllers/housingController');

// Route for fetching housing options
router.get('/', getHousingOptions);

module.exports = router;
