const express = require('express');
const router = express.Router();
const { registerStudent } = require('../controllers/studentsController');

// Route for registering a new student
router.post('/register', registerStudent);

module.exports = router;
