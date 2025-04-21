const db = require('../db/db');

// Controller for fetching housing options
const getHousingOptions = async (req, res) => {
    try {
        const housingOptions = await db.query('SELECT * FROM hostels');
        res.status(200).json(housingOptions.rows);
    } catch (error) {
        console.error('Error fetching housing options:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = {
    getHousingOptions,
};
