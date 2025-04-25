// routes/dashboard.js
const express = require('express');
const { getDashboard } = require('../controllers/dashboardController');
const router = express.Router();

// GET /api/dashboard → protected dashboard data
router.get('/', getDashboard);

// NOTE: The routes for applying and notifications were causing errors
// because `dashboardController.applyForHousing` and
// `dashboardController.getNotifications` were not defined here.
// Those handlers should be moved to their correct controllers/routes:
// e.g., POST /api/applications and GET /api/notifications

// Remove or comment out invalid routes below:
// router.post('/apply', applyForHousing);
// router.get('/notifications', getNotifications);

module.exports = router;

