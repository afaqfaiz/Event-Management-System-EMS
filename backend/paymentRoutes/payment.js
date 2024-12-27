const express = require('express');
const router = express.Router();
const { connection } = require('../db'); // Assuming db.js is configured
const moment = require('moment');

// API to process the payment and update booking status
router.post('/processPayment', (req, res) => {
  const { Booking_ID, Client_ID, Amount, Payment_Method } = req.body;

  // Step 1: Insert the payment record into the Payment table
  const paymentQuery = `
    INSERT INTO Payment (Booking_ID, Client_ID, Amount, Payment_Date, Payment_Method)
    VALUES (?, ?, ?, ?, ?)
  `;

  const paymentData = [
    Booking_ID,
    Client_ID,
    Amount,
    moment().format('YYYY-MM-DD'), // Today's date
    Payment_Method
  ];

  connection.query(paymentQuery, paymentData, (err, result) => {
    if (err) {
      console.error('Error processing payment:', err);
      return res.status(500).json({ error: 'Failed to process payment' });
    }

    // Step 2: Update the Booking_Status to 'Confirmed'
    const bookingUpdateQuery = `
      UPDATE Bookings
      SET Booking_Status = 'Confirmed'
      WHERE Booking_ID = ?
    `;

    connection.query(bookingUpdateQuery, [Booking_ID], (err, updateResult) => {
      if (err) {
        console.error('Error updating booking status:', err);
        return res.status(500).json({ error: 'Failed to update booking status' });
      }

      return res.status(200).json({ success: true, message: 'Payment processed and booking confirmed' });
    });
  });
});

module.exports = router;