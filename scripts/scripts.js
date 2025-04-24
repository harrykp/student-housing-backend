const db = require('./db');

// Example script: Fetch all Users
(async () => {
  console.log('Fetching all Users...');
  const result = await db.query('SELECT * FROM users');
  console.log(result.rows);
})();
