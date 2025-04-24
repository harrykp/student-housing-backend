const express = require('express');
const router = express.Router();
const { registerStudent } = require('../controllers/registerController');

// Route for registering a new student
router.post('/register', registerStudent);

module.exports = router;
