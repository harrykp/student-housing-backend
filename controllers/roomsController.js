const db = require('../db');

// Function to fetch all rooms
const getRooms = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM rooms');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching rooms:', err); // Log error for debugging
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

// Function to create a new room
const createRoom = async (req, res) => {
  const { hostel_id, name, photo_url, description, occupancy_limit, available, created_at, available_count } = req.body;

  // Validate required fields
  if (!hostel_id || !name || !description || !occupancy_limit || !created_at) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await db.query(
      'INSERT INTO rooms (hostel_id, name, photo_url, description, occupancy_limit, available, created_at, available_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [hostel_id, name, photo_url, description, occupancy_limit, available || true, created_at, available_count || 0]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error creating room:', err); // Log error for debugging
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

// Function to fetch occupants of a specific room
const getOccupants = async (req, res) => {
  const { roomId } = req.params;

  try {
    const result = await db.query(
      'SELECT * FROM occupants WHERE room_id = $1',
      [roomId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found or no occupants.' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching occupants:', err); // Log error for debugging
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

module.exports = { getRooms, createRoom, getOccupants };
