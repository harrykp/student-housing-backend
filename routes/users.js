const express = require('express');
const { getUsers, createUser } = require('../controllers/usersController');
const router = express.Router();

// Routes for users
router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;
