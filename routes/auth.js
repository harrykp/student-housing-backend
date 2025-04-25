// routes/auth.js
const express = require('express');
const { loginUser } = require('../controllers/authController');
const router = express.Router();

// POST /auth/login → authenticate and return token
router.post('/login', loginUser);

module.exports = router;
