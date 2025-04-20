const db = require('../db/db');

// Get all applications
exports.getApplications = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM applications');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    await db.query('UPDATE applications SET status = $1 WHERE id = $2', [status, applicationId]);
    res.status(200).json({ message: 'Application status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application status' });
  }
};