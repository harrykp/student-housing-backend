const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/dashboardController');

// GET /api/dashboard → protected dashboard data
router.get('/', getDashboard);

// Apply for housing
router.post('/apply', dashboardController.applyForHousing);

// Fetch notifications for the student
router.get('/notifications', dashboardController.getNotifications);

module.exports = router;
