const db = require('../db');

// Get all applications
const getApplications = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM applications');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new application
const createApplication = async (req, res) => {
  const { user_id, room_id, status, applied_at, room_preference, personal_details, notified } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO applications (user_id, room_id, status, applied_at, room_preference, personal_details, notified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [user_id, room_id, status, applied_at, room_preference, personal_details, notified]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getApplications, createApplication };
