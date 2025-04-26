// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const pool   = require('../db/db');

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // select `name` as `username` to match your DB schema
    const result = await pool.query(
      'SELECT id, name AS username, password FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (err) {
    console.error('loginUser error:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { loginUser };
