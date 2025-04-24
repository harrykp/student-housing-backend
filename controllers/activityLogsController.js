const db = require('../db');

const getActivityLogs = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM activity_logs');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createActivityLog = async (req, res) => {
  const { actor_id, actor_role, action, timestamp, details } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO activity_logs (actor_id, actor_role, action, timestamp, details) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [actor_id, actor_role, action, timestamp, details]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getActivityLogs, createActivityLog };
