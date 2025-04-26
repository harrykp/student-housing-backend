const pool = require('../db/db');

// Fetch all hostels
async function getAllHostels(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, name, description, occupancy_limit, photo_url FROM hostels'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('getAllHostels error:', err);
    res.status(500).json({ error: 'Failed to fetch hostels.' });
  }
}

// Fetch single hostel by ID
async function getHostelById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, name, description, occupancy_limit, photo_url FROM hostels WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('getHostelById error:', err);
    res.status(500).json({ error: 'Failed to fetch hostel.' });
  }
}

// Create a new hostel
async function createHostel(req, res) {
  try {
    const { name, description, occupancy_limit, photo_url } = req.body;
    const result = await pool.query(
      `INSERT INTO hostels (name, description, occupancy_limit, photo_url)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, occupancy_limit, photo_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('createHostel error:', err);
    res.status(500).json({ error: 'Failed to create hostel.' });
  }
}

// Update an existing hostel
async function updateHostel(req, res) {
  try {
    const { id } = req.params;
    const { name, description, occupancy_limit, photo_url } = req.body;
    const result = await pool.query(
      `UPDATE hostels SET name=$1, description=$2, occupancy_limit=$3, photo_url=$4
       WHERE id = $5 RETURNING *`,
      [name, description, occupancy_limit, photo_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('updateHostel error:', err);
    res.status(500).json({ error: 'Failed to update hostel.' });
  }
}

// Delete a hostel
async function deleteHostel(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM hostels WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    res.json({ message: 'Hostel deleted' });
  } catch (err) {
    console.error('deleteHostel error:', err);
    res.status(500).json({ error: 'Failed to delete hostel.' });
  }
}

module.exports = {
  getAllHostels,
  getHostelById,
  createHostel,
  updateHostel,
  deleteHostel
};
