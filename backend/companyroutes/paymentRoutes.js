const express = require('express');
const { connection } = require('../db'); // Import database connection
const router = express.Router();

// API to get all payments for a company
router.get('/getPaymentsByCompany/:companyId', (req, res) => {
  const { companyId } = req.params;

  // SQL query to get payments for the company, including relevant booking details
  const paymentsQuery = `
   SELECT 
      p.Payment_ID, 
      b.Booking_ID, 
      b.Total_Cost as amount, 
      p.Payment_Method as method, 
      p.Payment_Date as date, 
      c.Client_Name as clientname, 
      h.Hall_name as hallname
    FROM Payment p
    JOIN Bookings b ON p.Booking_ID = b.Booking_ID
    JOIN Client c ON b.Client_ID = c.Client_ID
    JOIN Hall h ON b.Hall_ID = h.Hall_ID
    WHERE b.Company_ID = ?
  `;

  connection.query(paymentsQuery, [companyId], (err, results) => {
    if (err) {
      console.error('Error fetching payments:', err);
      return res.status(500).json({ message: 'Failed to fetch payments.' });
    }

    return res.json(results); // Send the payments data as the response
  });
});

module.exports = router;
