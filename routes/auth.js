const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Login functionality
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Determine table based on role
        const table = role === 'admin' ? 'admins' : 'students';

        // Check if email exists and password matches
        const user = await db.query(`SELECT * FROM ${table} WHERE email = $1 AND password = $2`, [email, password]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({ message: 'Login successful.', user: user.rows[0] });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
