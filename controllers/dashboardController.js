const pool = require('../db/db');
const Joi = require('joi'); // Add Joi for validation

// Fetch dashboard data for students
exports.getDashboard = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        const userId = req.user.id;

        const [profileResult, applicationsResult, assignedRoomsResult, notificationsResult, statsResult, hostelsResult, activitiesResult] = await Promise.all([
            pool.query('SELECT name, email FROM users WHERE id = $1', [userId]),
            pool.query(`
                SELECT r.name AS room, a.status, a.applied_at
                FROM applications a
                JOIN rooms r ON a.room_id = r.id
                WHERE a.user_id = $1`, [userId]),
            pool.query(`
                SELECT r.name AS room, h.name AS hostel
                FROM rooms r
                JOIN hostels h ON r.hostel_id = h.id
                WHERE r.id IN (SELECT room_id FROM applications WHERE user_id = $1 AND status = 'Accepted')`, [userId]),
            pool.query(`
                SELECT message, type, created_at
                FROM notifications
                WHERE user_id = $1 AND user_role = 'student'
                ORDER BY created_at DESC`, [userId]),
            pool.query(`
                SELECT COUNT(*) AS total, 
                       SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending,
                       SUM(CASE WHEN status = 'Accepted' THEN 1 ELSE 0 END) AS accepted,
                       SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected
                FROM applications
                WHERE user_id = $1`, [userId]),
            pool.query(`
                SELECT name, address
                FROM hostels`),
            pool.query(`
                SELECT description
                FROM activities
                WHERE user_id = $1
                ORDER BY created_at DESC
                LIMIT 10`, [userId])
        ]);

        res.status(200).json({
            profile: profileResult.rows[0],
            stats: statsResult.rows[0],
            applications: applicationsResult.rows,
            assignedRooms: assignedRoomsResult.rows,
            notifications: notificationsResult.rows,
            hostels: hostelsResult.rows,
            activities: activitiesResult.rows.map(row => row.description)
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error.stack);
        res.status(500).json({ error: 'Unable to fetch dashboard data. Please try again later.' });
    }
};

// Apply for housing
exports.applyForHousing = async (req, res) => {
    try {
        // Validate request body using Joi
        const applicationSchema = Joi.object({
            userId: Joi.number().required(),
            roomId: Joi.number().required(),
            roomPreference: Joi.string().max(255).optional(),
            personalDetails: Joi.string().max(1000).optional(),
        });
        const { error } = applicationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { userId, roomId, roomPreference, personalDetails } = req.body;

        const applicationQuery = `
            INSERT INTO applications (user_id, room_id, room_preference, personal_details)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const applicationResult = await pool.query(applicationQuery, [
            userId,
            roomId,
            roomPreference,
            personalDetails,
        ]);

        res.status(201).json(applicationResult.rows[0]);
    } catch (error) {
        console.error('Error applying for housing:', error.stack); // Log stack trace
        res.status(500).json({ error: 'Failed to submit housing application. Please try again later.' });
    }
};

// Fetch notifications for the student
exports.getNotifications = async (req, res) => {
    try {
        // Ensure req.user exists and contains id
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        const userId = req.user.id;

        const notificationsQuery = `
            SELECT message, type, created_at
            FROM notifications
            WHERE user_id = $1 AND user_role = 'student'
            ORDER BY created_at DESC`;
        const notificationsResult = await pool.query(notificationsQuery, [userId]);

        res.status(200).json(notificationsResult.rows);
    } catch (error) {
        console.error('Error fetching notifications:', error.stack); // Log stack trace
        res.status(500).json({ error: 'Unable to fetch notifications. Please try again later.' });
    }
};
