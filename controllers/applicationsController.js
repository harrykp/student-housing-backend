const db = require('../db/db');
const { createNotification } = require('./notificationsController');

// Submit a housing application
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

        // Log activity
        await addActivityLog(studentId, 'student', 'Submitted housing application', { roomPreference });

    } catch (error) {
        console.error('Error submitting application:', error.message);
        res.status(500).json({ message: 'Failed to submit application.' });
    }
};

// Update application status and notify student
const updateApplicationStatus = async (req, res) => {
    const { applicationId, status } = req.body;

    try {
        // Update status
        await db.query('UPDATE applications SET status = $1 WHERE id = $2', [status, applicationId]);

        // Fetch application details
        const application = await db.query('SELECT student_id FROM applications WHERE id = $1', [applicationId]);
        const studentId = application.rows[0].student_id;

        // Notify student
        const message = `Your application status has been updated to: ${status}`;
        await createNotification(studentId, 'student', message, 'alert');

        res.status(200).json({ message: 'Application status updated and student notified.' });

        // Log activity
        await addActivityLog(studentId, 'admin', `Updated application status to ${status}`);

    } catch (error) {
        console.error('Error updating application status:', error.message);
        res.status(500).json({ message: 'Failed to update application status.' });
    }
};

module.exports = {
    submitApplication,
    updateApplicationStatus,
};
