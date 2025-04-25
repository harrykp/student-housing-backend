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

// Fetch all rooms
exports.getRooms = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rooms ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching rooms:', error.message);
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};

// Create a new room
exports.createRoom = async (req, res) => {
    try {
        const { hostelId, roomNumber } = req.body;

        const query = 'INSERT INTO rooms (hostel_id, room_number) VALUES ($1, $2) RETURNING *';
        const result = await pool.query(query, [hostelId, roomNumber]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating room:', error.message);
        res.status(500).json({ error: 'Failed to create room' });
    }
};

// Update an existing room
exports.updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { hostelId, roomNumber } = req.body;

        const query = 'UPDATE rooms SET hostel_id = $1, room_number = $2 WHERE id = $3 RETURNING *';
        const result = await pool.query(query, [hostelId, roomNumber, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating room:', error.message);
        res.status(500).json({ error: 'Failed to update room' });
    }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM rooms WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting room:', error.message);
        res.status(500).json({ error: 'Failed to delete room' });
    }
};

// Fetch all students
exports.getStudents = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching students:', error.message);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

// Fetch all applications
exports.getApplications = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM applications ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching applications:', error.message);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const query = 'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *';
        const result = await pool.query(query, [status, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating application status:', error.message);
        res.status(500).json({ error: 'Failed to update application status' });
    }
};

// Send a notification
exports.sendNotification = async (req, res) => {
    try {
        const { title, message } = req.body;

        const query = 'INSERT INTO notifications (title, message) VALUES ($1, $2) RETURNING *';
        const result = await pool.query(query, [title, message]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error sending notification:', error.message);
        res.status(500).json({ error: 'Failed to send notification' });
    }
};
