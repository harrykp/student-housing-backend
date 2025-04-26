const pool = require('../db/db');

// Fetch all rooms
async function getAllRooms(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, name, description, price, occupancy_limit, hostel_id, photo_url FROM rooms'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('getAllRooms error:', err);
    res.status(500).json({ error: 'Failed to fetch rooms.' });
  }
}

// Fetch single room by ID
async function getRoomById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, name, description, price, occupancy_limit, hostel_id, photo_url FROM rooms WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('getRoomById error:', err);
    res.status(500).json({ error: 'Failed to fetch room.' });
  }
}

// Create a new room
async function createRoom(req, res) {
  try {
    const { name, description, price, occupancy_limit, hostel_id, photo_url } = req.body;
    const result = await pool.query(
      `INSERT INTO rooms (name, description, price, occupancy_limit, hostel_id, photo_url)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, price, occupancy_limit, hostel_id, photo_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('createRoom error:', err);
    res.status(500).json({ error: 'Failed to create room.' });
  }
}

// Update an existing room
async function updateRoom(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, occupancy_limit, hostel_id, photo_url } = req.body;
    const result = await pool.query(
      `UPDATE rooms SET name=$1, description=$2, price=$3, occupancy_limit=$4, hostel_id=$5, photo_url=$6
       WHERE id = $7 RETURNING *`,
      [name, description, price, occupancy_limit, hostel_id, photo_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('updateRoom error:', err);
    res.status(500).json({ error: 'Failed to update room.' });
  }
}

// Delete a room
async function deleteRoom(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM rooms WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json({ message: 'Room deleted' });
  } catch (err) {
    console.error('deleteRoom error:', err);
    res.status(500).json({ error: 'Failed to delete room.' });
  }
}

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
};
