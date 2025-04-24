const db = require('../db/db');

// Controller for registering a new student
const registerStudent = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if student already exists
        const studentExists = await db.query('SELECT * FROM students WHERE email = $1', [email]);
        if (studentExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Insert new student
        await db.query(
            'INSERT INTO users (name, email, phone,password) VALUES ($1, $2, $3, $4)',
            [name, email, phone, password]
        );
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = {
    registerStudent,
};
