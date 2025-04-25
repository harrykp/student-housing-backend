// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // needed for creating JWTs
const pool = require('../db/db');

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const result = await pool.query(
      'SELECT id, username, password FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
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

// controllers/authController.js
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    // single users table
    const userRes = await db.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (userRes.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    res.status(200).json({ message: 'Login successful.', user: userRes.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
module.exports = { login };
