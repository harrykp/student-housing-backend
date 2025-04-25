// controllers/usersController.js
const bcrypt = require('bcrypt');
const pool = require('../db/db'); // fixed path; no JWT functions here, so no jwt import

async function getUsers(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, username, email FROM users'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('getUsers error:', err);
    res.status(500).json({ error: err.message });
  }
}

async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('createUser error:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getUsers, createUser };
