const db = require('../db/db');

// Add a new activity log
const addActivityLog = async (actorId, actorRole, action, details = null) => {
    try {
        await db.query(
            'INSERT INTO activity_logs (actor_id, actor_role, action, details) VALUES ($1, $2, $3, $4)',
            [actorId, actorRole, action, details]
        );
    } catch (error) {
        console.error('Error logging activity:', error.message);
        throw new Error('Failed to log activity.');
    }
};

// Fetch all activity logs with resolved actor details
const getActivityLogs = async (req, res) => {
    try {
        const logs = await db.query('SELECT * FROM activity_logs ORDER BY timestamp DESC');
        const enrichedLogs = await Promise.all(
            logs.rows.map(async (log) => {
                let actorDetails = null;
                if (log.actor_role === 'student') {
                    const student = await db.query('SELECT name, email FROM students WHERE id = $1', [log.actor_id]);
                    actorDetails = student.rows[0];
                } else if (log.actor_role === 'admin') {
                    const admin = await db.query('SELECT name, email FROM admins WHERE id = $1', [log.actor_id]);
                    actorDetails = admin.rows[0];
                }
                return { ...log, actor: actorDetails };
            })
        );
        res.status(200).json(enrichedLogs);
    } catch (error) {
        console.error('Error fetching activity logs:', error.message);
        res.status(500).json({ message: 'Failed to fetch activity logs.' });
    }
};


//Create activity logs
const createActivityLog = async (req, res) => {
    try {
        const { actorId, actorRole, action, details } = req.body;
        await db.query(
            'INSERT INTO activity_logs (actor_id, actor_role, action, details) VALUES ($1, $2, $3, $4)',
            [actorId, actorRole, action, details]
        );
        res.status(201).json({ message: 'Activity log created successfully.' });
    } catch (error) {
        console.error('Error creating activity log:', error.message);
        res.status(500).json({ message: 'Failed to create activity log.' });
    }
};
module.exports = {
    addActivityLog,
    getActivityLogs,
    createActivityLog,
};
