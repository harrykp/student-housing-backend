const express = require('express');
const router = express.Router();
const { submitApplication, getApplications } = require('../controllers/applicationsController');

// Route for submitting a housing application
router.post('/', submitApplication);

// Route for fetching all applications
router.get('/', getApplications);

module.exports = router;
