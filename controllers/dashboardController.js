const db = require('../db/db'');

// Get student's dashboard data
exports.getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id; // Assuming user is authenticated and ID is in req.user
    const student = await db.query('SELECT name, email FROM students WHERE id = $1', [studentId]);
    const applications = await db.query(
      `SELECT rooms.name AS room, applications.status, applications.applied_at
       FROM applications
       JOIN rooms ON applications.room_id = rooms.id
       WHERE applications.student_id = $1`,
      [studentId]
    );

    res.status(200).json({
      name: student.rows[0].name,
      email: student.rows[0].email,
      applications: applications.rows,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};