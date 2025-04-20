const db = require('./db');

// Example script: Fetch all students
(async () => {
  console.log('Fetching all students...');
  const result = await db.query('SELECT * FROM students');
  console.log(result.rows);
})();