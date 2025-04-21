const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controllers/notificationsController');

// Route for fetching notifications for a user
router.get('/', getNotifications);

// Route for marking a notification as read
router.put('/:notificationId/read', markAsRead);

module.exports = router;
