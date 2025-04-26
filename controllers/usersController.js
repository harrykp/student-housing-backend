// controllers/usersController.js

const bcrypt = require('bcrypt');
const pool   = require('../db/db');

/**
 * GET /api/users
 */
async function getUsers(req, res) {
  try {
    // alias "name" → "username" so front-end still sees .username
    const result = await pool.query(
      'SELECT id, name AS username, email, phone FROM users'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('getUsers error:', err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * POST /api/users
 */
async function createUser(req, res) {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const insertQuery = `
      INSERT INTO users (name, email, phone, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name AS username, email, phone
    `;
    const values = [username, email, phone, hashed];

    const result = await pool.query(insertQuery, values);
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error('createUser error:', err);
    // handle unique-email violation
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already in use.' });
    }
    res.status(500).json({ error: 'Failed to create user.' });
  }
}

module.exports = {
  getUsers,
  createUser,
};
