const db = require('../db/db');

// Controller for submitting a housing application
const submitApplication = async (req, res) => {
    const { studentId, roomPreference, personalDetails } = req.body;

    if (!studentId || !roomPreference || !personalDetails) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        await db.query(
            'INSERT INTO applications (student_id, room_preference, personal_details) VALUES ($1, $2, $3)',
            [studentId, roomPreference, personalDetails]
        );
        res.status(201).json({ message: 'Application submitted successfully.' });
    } catch (error) {
        console.error('Error submitting application:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Controller for fetching all applications (optional for admin)
const getApplications = async (req, res) => {
    try {
        const applications = await db.query('SELECT * FROM applications');
        res.status(200).json(applications.rows);
    } catch (error) {
        console.error('Error fetching applications:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = {
    submitApplication,
    getApplications,
};
