const db = require('../db/db');

// Controller for registering a new student
const registerStudent = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if student already exists
        const studentExists = await db.query('SELECT * FROM students WHERE email = $1', [email]);
        if (studentExists.rows.length > 0) {
            return res.status(400).json({ message: 'Student already exists.' });
        }

        // Insert new student
        await db.query(
            'INSERT INTO students (name, email, password) VALUES ($1, $2, $3)',
            [name, email, password]
        );
        res.status(201).json({ message: 'Student registered successfully.' });
    } catch (error) {
        console.error('Error registering student:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = {
    registerStudent,
};
