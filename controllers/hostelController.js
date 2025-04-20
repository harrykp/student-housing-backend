const db = require('../db');

// Get all hostels
exports.getHostels = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM hostels');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hostels' });
  }
};

// Create a new hostel
exports.createHostel = async (req, res) => {
  try {
    const { name, address } = req.body;
    await db.query('INSERT INTO hostels (name, address) VALUES ($1, $2)', [name, address]);
    res.status(201).json({ message: 'Hostel created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create hostel' });
  }
};