const express = require('express');
const router = express.Router();
const { getApplications, updateApplicationStatus } = require('../controllers/applicationController');

// Route to fetch all applications
router.get('/', getApplications);

// Route to update application status
router.put('/:applicationId', updateApplicationStatus);

module.exports = router;