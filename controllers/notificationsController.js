const db = require('../db/db');

// Create a new notification
const createNotification = async (userId, userRole, message, type = 'info') => {
    try {
        await db.query(
            'INSERT INTO notifications (user_id, user_role, message, type) VALUES ($1, $2, $3, $4)',
            [userId, userRole, message, type]
        );
    } catch (error) {
        console.error('Error creating notification:', error.message);
        throw new Error('Failed to create notification.');
    }
};

// Fetch notifications for a user
const getNotifications = async (req, res) => {
    const { userId, userRole } = req.query;

    try {
        const notifications = await db.query(
            'SELECT * FROM notifications WHERE user_id = $1 AND user_role = $2 ORDER BY created_at DESC',
            [userId, userRole]
        );
        res.status(200).json(notifications.rows);
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ message: 'Failed to fetch notifications.' });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    const { notificationId } = req.params;

    try {
        await db.query('UPDATE notifications SET is_read = TRUE WHERE id = $1', [notificationId]);
        res.status(200).json({ message: 'Notification marked as read.' });
    } catch (error) {
        console.error('Error marking notification as read:', error.message);
        res.status(500).json({ message: 'Failed to mark notification as read.' });
    }
};

module.exports = {
    createNotification,
    getNotifications,
    markAsRead,
};
