const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Submit a housing application
router.post('/', async (req, res) => {
    const { studentId, roomPreference, personalDetails } = req.body;

    if (!studentId || !roomPreference || !personalDetails) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Insert new application
        await db.query(
            'INSERT INTO applications (student_id, room_preference, personal_details) VALUES ($1, $2, $3)',
            [studentId, roomPreference, personalDetails]
        );
        res.status(201).json({ message: 'Application submitted successfully.' });
    } catch (error) {
        console.error('Error submitting application:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Retrieve applications (optional for admin view)
router.get('/', async (req, res) => {
    try {
        const applications = await db.query('SELECT * FROM applications');
        res.status(200).json(applications.rows);
    } catch (error) {
        console.error('Error fetching applications:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
