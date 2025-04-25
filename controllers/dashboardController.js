const pool = require('../db/db');

// Fetch dashboard data for students
exports.getDashboard = async (req, res) => {
    try {
        const studentId = req.user.id; // Assuming authentication middleware provides user ID

        // Fetch profile data
        const profileQuery = 'SELECT name, email FROM users WHERE id = $1';
        const profileResult = await pool.query(profileQuery, [studentId]);

        // Fetch applications
        const applicationsQuery = `
            SELECT r.name AS room, a.status, a.applied_at
            FROM applications a
            JOIN rooms r ON a.room_id = r.id
            WHERE a.student_id = $1`;
        const applicationsResult = await pool.query(applicationsQuery, [studentId]);

        // Fetch assigned rooms
        const assignedRoomsQuery = `
            SELECT r.name AS room, h.name AS hostel
            FROM rooms r
            JOIN hostels h ON r.hostel_id = h.id
            WHERE r.id IN (SELECT room_id FROM applications WHERE student_id = $1 AND status = 'Accepted')`;
        const assignedRoomsResult = await pool.query(assignedRoomsQuery, [studentId]);

        // Fetch notifications
        const notificationsQuery = `
            SELECT message, type, created_at
            FROM notifications
            WHERE user_id = $1 AND user_role = 'student'
            ORDER BY created_at DESC`;
        const notificationsResult = await pool.query(notificationsQuery, [studentId]);

        res.status(200).json({
            profile: profileResult.rows[0],
            applications: applicationsResult.rows,
            assignedRooms: assignedRoomsResult.rows,
            notifications: notificationsResult.rows,
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
};

// Apply for housing
exports.applyForHousing = async (req, res) => {
    try {
        const { studentId, roomId, roomPreference, personalDetails } = req.body;

        const applicationQuery = `
            INSERT INTO applications (student_id, room_id, room_preference, personal_details)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const applicationResult = await pool.query(applicationQuery, [
            studentId,
            roomId,
            roomPreference,
            personalDetails,
        ]);

        res.status(201).json(applicationResult.rows[0]);
    } catch (error) {
        console.error('Error applying for housing:', error.message);
        res.status(500).json({ error: 'Failed to apply for housing' });
    }
};

// Fetch notifications for the student
exports.getNotifications = async (req, res) => {
    try {
        const studentId = req.user.id;

        const notificationsQuery = `
            SELECT message, type, created_at
            FROM notifications
            WHERE user_id = $1 AND user_role = 'student'
            ORDER BY created_at DESC`;
        const notificationsResult = await pool.query(notificationsQuery, [studentId]);

        res.status(200).json(notificationsResult.rows);
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};
