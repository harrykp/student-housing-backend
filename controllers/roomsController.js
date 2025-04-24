const db = require('../db');

const getRooms = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM rooms');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createRoom = async (req, res) => {
  const { hostel_id, name, photo_url, description, occupancy_limit, available, created_at, available_count } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO rooms (hostel_id, name, photo_url, description, occupancy_limit, available, created_at, available_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [hostel_id, name, photo_url, description, occupancy_limit, available, created_at, available_count]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getRooms, createRoom };
