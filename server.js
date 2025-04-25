// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken'); // needed for verifying JWTs
const pool = require('./db/db'); // correct path to your db module

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// JWT verification middleware
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.warn('Invalid token:', err.message);
    }
  }
  next();
});

// Route Handlers (import your routers)
const hostelsRoute = require('./routes/hostels');
const roomsRoute = require('./routes/rooms');
const applicationsRoute = require('./routes/applications');
const activityLogsRoute = require('./routes/activityLogs');
const notificationsRoute = require('./routes/notifications');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth'); // added auth router
const dashboardRoute = require('./routes/dashboard');
const adminRoute = require('./routes/admin');

// Mount routes under /api
app.use('/api/hostels', hostelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/applications', applicationsRoute);
app.use('/api/activity-logs', activityLogsRoute);
app.use('/api/notifications', notificationsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute); // mount auth routes
app.use('/api/dashboard', dashboardRoute);
app.use('/api/admin', adminRoute);

// Health Check Endpoint
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
