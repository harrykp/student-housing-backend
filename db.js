const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
 ssl: {
    rejectUnauthorized: false, // Required for Render
  },
});

module.exports = pool;

//----
//const { Pool } = require('pg');

// Create a pool instance with your database configuration
//const pool = new Pool({
//    user: 'your_db_user',
//   host: 'localhost', // Or your database host
//    database: 'your_database_name',
//    password: 'your_db_password',
//    port: 5432, // Default PostgreSQL port
//    ssl: false, // Disable SSL explicitly
//});

//module.exports = {
//    query: (text, params) => pool.query(text, params),
//    pool,
//};

//-------
//const { Pool } = require('pg');
//require('dotenv').config();

//const pool = new Pool({
//  connectionString: process.env.DATABASE_URL,
// ssl: {
//    rejectUnauthorized: false, // Required for Render
//  },
//});

//module.exports = pool;