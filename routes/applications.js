const express = require('express');
const router = express.Router();
const { submitApplication, updateApplicationStatus } = require('../controllers/applicationsController');

// Route for submitting a housing application
router.post('/', submitApplication);

// Route for updating application status (for admins)
router.put('/status', updateApplicationStatus);

module.exports = router;
