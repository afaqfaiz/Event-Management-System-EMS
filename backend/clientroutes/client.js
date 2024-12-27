const express = require('express');
const { connection } = require('../db'); // Import the DB connection
const router = express.Router();
require('dotenv').config();


router.get('/gethalls', (req, res) => {
    const query = 'SELECT * FROM Hall'; // Adjust table name to match your database
    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json(results);
    });
  });
  
  module.exports = router;