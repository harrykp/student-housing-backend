const pool = require('../db/db');

// Fetch all hostels
exports.getHostels = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM hostels ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching hostels:', error.message);
        res.status(500).json({ error: 'Failed to fetch hostels' });
    }
};

// Create a new hostel
exports.createHostel = async (req, res) => {
    try {
        const { name, address } = req.body;

        const query = 'INSERT INTO hostels (name, address) VALUES ($1, $2) RETURNING *';
        const result = await pool.query(query, [name, address]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating hostel:', error.message);
        res.status(500).json({ error: 'Failed to create hostel' });
    }
};

// Update an existing hostel
exports.updateHostel = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address } = req.body;

        const query = 'UPDATE hostels SET name = $1, address = $2 WHERE id = $3 RETURNING *';
        const result = await pool.query(query, [name, address, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating hostel:', error.message);
        res.status(500).json({ error: 'Failed to update hostel' });
    }
};

// Delete a hostel
exports.deleteHostel = async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM hostels WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting hostel:', error.message);
        res.status(500).json({ error: 'Failed to delete hostel' });
    }
};

// More methods for rooms, applications, and notifications would follow a similar pattern.
