const db = require('../db/db'); // Ensure 'db.js' initializes the database connection
const bcrypt = require('bcrypt');

(async () => {
  try {
    console.log('Seeding database...');
    // Truncate all tables
    console.log('Clearing existing data...');
    await db.query('TRUNCATE TABLE hostels, rooms, students, applications RESTART IDENTITY CASCADE');

    // 1. Insert example hostels
    console.log('Seeding hostels...');
    await db.query(`
      INSERT INTO hostels (name, address)
      VALUES 
        ($1, $2),
        ($3, $4),
        ($5, $6)
    `, [
      'Pounds Villa Hostel', '123 Street',
      'A-City Hostel', '456 Avenue',
      'JD Hostel', '789 Road'
    ]);

    // 2. Insert example rooms
    console.log('Seeding rooms...');
    await db.query(`
      INSERT INTO rooms (hostel_id, name, photo_url, description, occupancy_limit, available)
      VALUES 
        ($1, $2, $3, $4, $5, $6),
        ($7, $8, $9, $10, $11, $12),
        ($13, $14, $15, $16, $17, $18),
        ($19, $20, $21, $22, $23, $24)
    `, [
      1, 'Room 101', 'https://example.com/room101.jpg', 'Single room with ensuite bathroom', 1, true,
      1, 'Room 102', 'https://example.com/room102.jpg', 'Double room with shared bathroom', 2, true,
      2, 'Room 201', 'https://example.com/room201.jpg', 'Triple room with balcony', 3, true,
      3, 'Room 301', 'https://example.com/room301.jpg', 'Quadruple room with garden view', 4, true
    ]);

    // 3. Insert example students
    console.log('Seeding students...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    await db.query(`
      INSERT INTO students (name, email, password)
      VALUES 
        ($1, $2, $3),
        ($4, $5, $6),
        ($7, $8, $9)
    `, [
      'Apryl Poku', 'apryl@example.com', hashedPassword,
      'Linda Osei', 'linda@example.com', hashedPassword,
      'Kofi Kinatta', 'kofi@example.com', hashedPassword
    ]);

    // 4. Insert example applications
    console.log('Seeding applications...');
    await db.query(`
      INSERT INTO applications (student_id, room_id, status, applied_at)
      VALUES
        ($1, $2, $3, NOW()),
        ($4, $5, $6, NOW()),
        ($7, $8, $9, NOW())
    `, [
      1, 1, 'Accepted',
      2, 2, 'Pending',
      3, 3, 'Rejected'
    ]);

    // 5. Insert example admins
    console.log('Seeding admins...');
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    await db.query(`
      INSERT INTO admins (name, email, password, role)
      VALUES 
        ($1, $2, $3, $4),
        ($5, $6, $7, $8)
    `, [
      'Admin User', 'admin@example.com', hashedAdminPassword, 'admin',
      'Manager User', 'manager@example.com', hashedAdminPassword, 'manager'
    ]);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error.stack);
  } finally {
    try {
      await db.end(); // Close the database connection
      console.log("Database connection closed.");
    } catch (err) {
      console.error("Error closing database connection:", err);
    }
  }
})();
