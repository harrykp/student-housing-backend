const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and attach user details to req
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user details (id, email, role) to req
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Middleware to check if the user's role is allowed
exports.roleCheck = (allowedRoles) => (req, res, next) => {
  const { role } = req.user; // Assuming user details are attached to req.user
  if (!allowedRoles.includes(role)) {
    return res.status(403).json({ error: 'Access forbidden' });
  }
  next();
};

// Middleware to redirect users to specific pages based on their roles
exports.redirectBasedOnRole = (req, res, next) => {
  const { role } = req.user; // Assuming user details are attached to req.user
  if (role === 'student') {
    return res.redirect('/dashboard.html'); // Redirect students to dashboard
  } else if (role === 'admin') {
    return res.redirect('/admin.html'); // Redirect admins to admin page
  } else {
    return res.status(403).json({ error: 'Access forbidden: Invalid role' });
  }
};
