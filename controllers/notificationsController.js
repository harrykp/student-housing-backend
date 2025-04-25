const db = require('../db');

// Get all notifications
const getNotifications = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM notifications');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  const { user_id, user_role, message, type, is_read, created_at } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO notifications (user_id, user_role, message, type, is_read, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, user_role, message, type, is_read, created_at]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const result = await db.query(
      'UPDATE notifications SET is_read = true WHERE id = $1 RETURNING *',
      [notificationId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getNotifications, createNotification, markAsRead };

