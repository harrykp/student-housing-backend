const express = require('express');
const router = express.Router();
const { getStudentDashboard } = require('../controllers/dashboardController');

// Route to fetch student-specific dashboard data
router.get('/', getStudentDashboard);

module.exports = router;