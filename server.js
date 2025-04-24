const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables
const pool = require('./db/db'); // Correct path to db.js

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const hostelsRoute = require('./routes/hostels');
const roomsRoute = require('./routes/rooms');
const applicationsRoute = require('./routes/applications');
const applicationRoute = require('./routes/application');
const dashboardRoute = require('./routes/dashboard');
const studentsRoute = require('./routes/students'); // New route for student registration
const authRoute = require('./routes/auth'); // New route for authentication
const housingRoute = require('./routes/housing'); // New route for housing options
const activityLogsRoute = require('./routes/activityLogs');
const notificationsRoute = require('./routes/notifications');

app.use('/api/hostels', hostelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/applications', applicationsRoute);
app.use('/api/application', applicationRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/students', studentsRoute); // Register new endpoint
app.use('/api/auth', authRoute); // Register new endpoint
app.use('/api/housing', housingRoute); // Register new endpoint
app.use('/api/activity-logs', activityLogsRoute);
app.use('/api/notifications', notificationsRoute);

// Health Check
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

