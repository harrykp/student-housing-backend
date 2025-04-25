const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Fetch dashboard data for students
router.get('/', dashboardController.getDashboard);

// Apply for housing
router.post('/apply', dashboardController.applyForHousing);

// Fetch notifications for the student
router.get('/notifications', dashboardController.getNotifications);

module.exports = router;
