// routes/users.js
const express = require('express');
const { getUsers, createUser } = require('../controllers/usersController');
const router = express.Router();

// GET /users → fetch all users
router.get('/', getUsers);

// POST /users → register a new user
router.post('/', createUser);

module.exports = router;
