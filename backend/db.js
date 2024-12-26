const mysql = require('mysql2');
require('dotenv').config();

// Create the connection configuration for MySQL
const connection = mysql.createConnection({
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306
});

const connectDB = () => {
  connection.connect((err) => {
    if (err) {
      console.error('Database connection failed: ', err.stack);
      return;
    }
    console.log('Connected to the database');
  });
};

module.exports = {
  connection,
  connectDB
};
