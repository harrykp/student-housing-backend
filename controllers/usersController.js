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
  const { username, email, phone, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (username, email, phone, password)
     VALUES ($1, $2, $3, $4) RETURNING id, username, email`,
    [username, email, phone, hashed]
  );
  res.status(201).json(result.rows[0]);
}
module.exports = { getUsers, createUser };

