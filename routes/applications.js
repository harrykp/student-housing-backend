const express = require('express');
const { getApplications, createApplication } = require('../controllers/applicationsController');
const router = express.Router();

// Routes for applications
router.get('/', getApplications);
router.post('/', createApplication);

module.exports = router;
