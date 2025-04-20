const db = require('./index'); // Assuming 'index.js' initializes the database connection
const bcrypt = require('bcrypt');

(async () => {
  try {
    console.log('Seeding database...');

    // 1. Insert example hostels
    console.log('Seeding hostels...');
    await db.query(`
      INSERT INTO hostels (name, address)
      VALUES 
        ('Green Valley Hostel', '123 Green Street'),
        ('Sunrise Hostel', '456 Orange Avenue'),
        ('Blue Horizon Hostel', '789 Blue Road')
    `);

    // 2. Insert example rooms
    console.log('Seeding rooms...');
    await db.query(`
      INSERT INTO rooms (hostel_id, name, photo_url, description, occupancy_limit, available)
      VALUES 
        (1, 'Room 101', 'https://example.com/room101.jpg', 'Single room with ensuite bathroom', 1, true),
        (1, 'Room 102', 'https://example.com/room102.jpg', 'Double room with shared bathroom', 2, true),
        (2, 'Room 201', 'https://example.com/room201.jpg', 'Triple room with balcony', 3, true),
        (3, 'Room 301', 'https://example.com/room301.jpg', 'Quadruple room with garden view', 4, true)
    `);

    // 3. Insert example students
    console.log('Seeding students...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    await db.query(`
      INSERT INTO students (name, email, password)
      VALUES
        ('Alice Johnson', 'alice@example.com', $1),
        ('Bob Smith', 'bob@example.com', $1),
        ('Charlie Brown', 'charlie@example.com', $1)
    `, [hashedPassword]);

    // 4. Insert example applications
    console.log('Seeding applications...');
    await db.query(`
      INSERT INTO applications (student_id, room_id, status, applied_at)
      VALUES
        (1, 1, 'Accepted', NOW()),
        (2, 2, 'Pending', NOW()),
        (3, 3, 'Rejected', NOW())
    `);

    // 5. Insert example admins
    console.log('Seeding admins...');
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    await db.query(`
      INSERT INTO admins (name, email, password, role)
      VALUES
        ('Admin User', 'admin@example.com', $1, 'admin'),
        ('Manager User', 'manager@example.com', $1, 'manager')
    `, [hashedAdminPassword]);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    db.end(); // Close the database connection
  }
})();