// controllers/dashboardController.js

const pool = require('../db/db');
const Joi  = require('joi'); // for applyForHousing validation

// Fetch dashboard data for students
exports.getDashboard = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }
    const userId = req.user.id;

    // Run only the real queries (no activities table)
    const [
      profileResult,
      applicationsResult,
      assignedRoomsResult,
      notificationsResult,
      statsResult,
      hostelsResult
    ] = await Promise.all([
      // Profile info
      pool.query('SELECT name, email FROM users WHERE id = $1', [userId]),

      // All applications by this user
      pool.query(`
        SELECT r.name AS room, a.status, a.applied_at
        FROM applications a
        JOIN rooms r ON a.room_id = r.id
        WHERE a.user_id = $1
      `, [userId]),

      // Accepted rooms (if any)
      pool.query(`
        SELECT r.name AS room, h.name AS hostel
        FROM rooms r
        JOIN hostels h ON r.hostel_id = h.id
        WHERE r.id IN (
          SELECT room_id
          FROM applications
          WHERE user_id = $1 AND status = 'Accepted'
        )
      `, [userId]),

      // Recent notifications → map to activities
      pool.query(`
        SELECT message, type, created_at
        FROM notifications
        WHERE user_id = $1 AND user_role = 'student'
        ORDER BY created_at DESC
        LIMIT 10
      `, [userId]),

      // Stats summary
      pool.query(`
        SELECT
          COUNT(*) FILTER (WHERE user_id = $1)                               AS total,
          COUNT(*) FILTER (WHERE user_id = $1 AND status = 'Pending')        AS pending,
          COUNT(*) FILTER (WHERE user_id = $1 AND status = 'Accepted')       AS accepted,
          COUNT(*) FILTER (WHERE user_id = $1 AND status = 'Rejected')       AS rejected
        FROM applications
      `, [userId]),

      // All hostels list
      pool.query('SELECT name, address FROM hostels')
    ]);

    // Extract plain list of messages
    const activities = notificationsResult.rows.map(n => n.message);

    res.status(200).json({
      profile:       profileResult.rows[0],
      stats:         statsResult.rows[0],
      applications:  applicationsResult.rows,
      assignedRooms: assignedRoomsResult.rows,
      hostels:       hostelsResult.rows,
      activities
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error.stack);
    res.status(500).json({
      error: 'Unable to fetch dashboard data. Please try again later.'
    });
  }
};

// Apply for housing
exports.applyForHousing = async (req, res) => {
  try {
    const applicationSchema = Joi.object({
      userId:          Joi.number().required(),
      roomId:          Joi.number().required(),
      roomPreference:  Joi.string().max(255).optional(),
      personalDetails: Joi.string().max(1000).optional(),
    });
    const { error } = applicationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { userId, roomId, roomPreference, personalDetails } = req.body;
    const applicationQuery = `
      INSERT INTO applications (user_id, room_id, room_preference, personal_details)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const { rows } = await pool.query(applicationQuery, [
      userId,
      roomId,
      roomPreference,
      personalDetails,
    ]);

    res.status(201).json(rows[0]);

  } catch (error) {
    console.error('Error applying for housing:', error.stack);
    res.status(500).json({
      error: 'Failed to submit housing application. Please try again later.'
    });
  }
};

// Fetch notifications for the student
exports.getNotifications = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const userId = req.user.id;
    const notificationsQuery = `
      SELECT message, type, created_at
      FROM notifications
      WHERE user_id = $1 AND user_role = 'student'
      ORDER BY created_at DESC
    `;
    const { rows } = await pool.query(notificationsQuery, [userId]);

    res.status(200).json(rows);

  } catch (error) {
    console.error('Error fetching notifications:', error.stack);
    res.status(500).json({
      error: 'Unable to fetch notifications. Please try again later.'
    });
  }
};
