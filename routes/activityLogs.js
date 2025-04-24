const express = require('express');
const { getActivityLogs, createActivityLog } = require('../controllers/activityLogsController');
const router = express.Router();

router.get('/', getActivityLogs);
router.post('/', createActivityLog);

module.exports = router;
