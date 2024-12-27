const express = require('express');
const router = express.Router();
const { connection } = require('../db');  // Importing the connection

// Register a Hall
router.post('/addhalls', (req, res) => {
    const { companyId, name, location, capacity, pricePerHour, rating } = req.body;
    hallName=name;
    hallCapacity=capacity;
    hallLocation=location;
    hallRating=rating;
  
    // Validate input
    if (!companyId || !hallName || !hallCapacity || !hallLocation || !pricePerHour || !hallRating) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    // Ensure hallRating is within a valid range (1-5)
    if (hallRating < 1 || hallRating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }
  
    // Check if a hall with the same name already exists for the given companyId
    const checkQuery = `SELECT * FROM Hall WHERE Company_ID = ? AND Hall_name = ?`;
    connection.query(checkQuery, [companyId, hallName], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error during hall existence check.' });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ message: 'A hall with this name already exists for the selected company.' });
      }
  
      // If no duplicate hall exists, insert the new hall
      const insertQuery = `INSERT INTO Hall (Company_ID, Hall_name, Hall_Capacity, Hall_location, Price_per_Hour, Hall_Rating) 
                           VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [companyId, hallName, hallCapacity, hallLocation, pricePerHour, hallRating];
  
      connection.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Database error while inserting hall.' });
        }
        res.status(201).json({ message: 'Hall registered successfully!', hallId: result.insertId });
      });
    });
  });
  
// Update Hall (Except hall_rating)
router.put('/updatehalls', (req, res) => {
  //const hallId = req.params.id;
  const { hallId,hallName, hallCapacity, hallLocation, pricePerHour } = req.body;

  // Validate input
  if (!hallName || !hallCapacity || !hallLocation || !pricePerHour) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = `UPDATE Hall SET Hall_name = ?, Hall_Capacity = ?, Hall_location = ?, Price_per_Hour = ? 
                 WHERE Hall_ID = ?`;
  const values = [hallName, hallCapacity, hallLocation, pricePerHour, hallId];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Hall not found.' });
    }

    res.status(200).json({ message: 'Hall updated successfully!' });
  });
});

// Delete a Specific Hall
router.delete('/deletehalls/:id', (req, res) => {
  const hallId = req.params.id;

  const query = `DELETE FROM Hall WHERE Hall_ID = ?`;

  connection.query(query, [hallId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Hall not found.' });
    }

    res.status(200).json({ message: 'Hall deleted successfully!' });
  });
});

// Get All Halls by Company ID
router.get('/gethalls/:companyId', (req, res) => {
  const companyId = req.params.companyId;

  const query = `SELECT * FROM Hall WHERE Company_ID = ?`;

  connection.query(query, [companyId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No halls found for this company.' });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
