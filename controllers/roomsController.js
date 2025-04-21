const db = require('../db/db');

// Update room availability count
const updateRoomAvailability = async (roomId, increment = -1) => {
    try {
        await db.query(
            'UPDATE rooms SET available_count = available_count + $1 WHERE id = $2 AND available_count + $1 >= 0',
            [increment, roomId]
        );
    } catch (error) {
        console.error('Error updating room availability:', error.message);
        throw new Error('Failed to update room availability.');
    }
};

module.exports = {
    updateRoomAvailability,
};
