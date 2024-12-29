const express = require('express');
const router = express.Router();
const { connection } = require('../db'); // Assuming db.js contains the database connection

// Fetch bookings by Company_ID
router.get('/getbookings/:companyId', (req, res) => {
  const { companyId } = req.params;

  const query = `
    SELECT 
      b.Booking_ID AS id,
      h.Hall_name AS hallName,
      c.Client_Name AS clientName,
      b.Event_Date AS date,
      b.Event_Start_Time AS time,
      b.Total_Cost AS totalCost,
      b.Booking_Status AS bookingStatus,
      b.Payment_Status AS paymentStatus
    FROM 
      Bookings b
    JOIN Hall h ON b.Hall_ID = h.Hall_ID
    JOIN Client c ON b.Client_ID = c.Client_ID
    WHERE 
      b.Company_ID = ?`;

  connection.query(query, [companyId], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json(results);

  });
});

module.exports = router;
