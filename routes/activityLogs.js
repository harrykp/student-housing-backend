const express = require('express');
const router = express.Router();
const { getActivityLogs } = require('../controllers/activityLogsController');

// Route for fetching activity logs
router.get('/', getActivityLogs);

module.exports = router;
