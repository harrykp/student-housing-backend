exports.roleCheck = (allowedRoles) => (req, res, next) => {
  const { role } = req.user; // Assuming user details are attached to req.user
  if (!allowedRoles.includes(role)) {
    return res.status(403).json({ error: 'Access forbidden' });
  }
  next();
};