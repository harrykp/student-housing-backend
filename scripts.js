const db = require('./db');

// Example script: Fetch all users
(async () => {
  console.log('Fetching all users...');
  const result = await db.query('SELECT * FROM users');
  console.log(result.rows);
})();
