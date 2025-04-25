const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Manage hostels
router.get('/hostels', adminController.getHostels);
router.post('/hostels', adminController.createHostel);
router.put('/hostels/:id', adminController.updateHostel);
router.delete('/hostels/:id', adminController.deleteHostel);

// Manage rooms
router.get('/rooms', adminController.getRooms);
router.post('/rooms', adminController.createRoom);
router.put('/rooms/:id', adminController.updateRoom);
router.delete('/rooms/:id', adminController.deleteRoom);

// Manage students
router.get('/students', adminController.getStudents);

// Manage applications
router.get('/applications', adminController.getApplications);
router.put('/applications/:id', adminController.updateApplicationStatus);

// Send notifications
router.post('/notifications', adminController.sendNotification);

module.exports = router;
