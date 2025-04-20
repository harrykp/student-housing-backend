const db = require('../db');

// Get all rooms
exports.getRooms = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM rooms');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};

// Add a new room
exports.addRoom = async (req, res) => {
  try {
    const { hostel_id, name, photo_url, description, occupancy_limit } = req.body;
    await db.query(
      'INSERT INTO rooms (hostel_id, name, photo_url, description, occupancy_limit) VALUES ($1, $2, $3, $4, $5)',
      [hostel_id, name, photo_url, description, occupancy_limit]
    );
    res.status(201).json({ message: 'Room added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add room' });
  }
};

// Get occupants of a room
exports.getOccupants = async (req, res) => {
  try {
    const { roomId } = req.params;
    const result = await db.query(
      `SELECT students.name, students.email FROM students
       JOIN applications ON students.id = applications.student_id
       WHERE applications.room_id = $1 AND applications.status = 'Accepted'`,
      [roomId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch occupants' });
  }
};