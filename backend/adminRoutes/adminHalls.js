const express = require('express');
const router = express.Router();
const { connection } = require('../db'); // Import the connection object from db.js

// Get hall details by Company_ID
router.get('/gethalls/:companyId', (req, res) => {
  const { companyId } = req.params;

  const query = `
    SELECT Hall_ID, Hall_name, Hall_Capacity, Hall_location, Price_per_Hour, Hall_Rating
    FROM Hall
    WHERE Company_ID = ?
  `;

  connection.query(query, [companyId], (err, results) => {
    if (err) {
      console.error('Error fetching hall details:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No halls found for this company.' });
    }

    res.json(results);
  });
});

// Delete hall by Hall_ID
router.delete('/deletehall/:hallId', (req, res) => {
    const { hallId } = req.params;
   
  
    const query = `DELETE FROM Hall WHERE Hall_ID = ?`;
  
    connection.query(query, [hallId], (err, results) => {
      if (err) {
        console.error('Error deleting hall:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Hall not found.' });
      }
  
      res.json({ message: 'Hall deleted successfully.' });
    });
  });

  

module.exports = router;
