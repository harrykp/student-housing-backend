const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// Route for registering a new student
router.post('/register', registerUser);

module.exports = router;
