const express = require('express');
const router = express.Router();
const { connection } = require('../db'); // Import the connection from db.js

router.get('/getByCompany/:companyId', (req, res) => {
    const companyId = req.params.companyId;
  
    const query = `
        SELECT 
        b.Booking_ID, 
        c.Client_Name as client, 
        h.Hall_name as hall, 
        b.Booking_Status as status, 
        b.Payment_Status as paymentStatus, 
        b.Event_Date as eventDate, 
        b.Booking_Date as bookingDate,         -- Added Booking_Date
        b.Event_Start_Time as eventStartTime,  -- Added Event_Start_Time
        b.Booking_Hours as bookingHours,      -- Added Booking_Hours
        b.Total_Cost as totalCost
      FROM Bookings b
      JOIN Client c ON b.Client_ID = c.Client_ID
      JOIN Hall h ON b.Hall_ID = h.Hall_ID
      WHERE b.Company_ID = ?;
    `;
    connection.query(query, [companyId], (err, results) => {
      if (err) {
        console.error('Error fetching bookings:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'No bookings found for this company' });
      }
      return res.status(200).json(results);
    });
  });
  
  router.put('/approveBooking/:bookingId', (req, res) => {
    const { bookingId } = req.params;
  
    // SQL query to update the booking status to 'Confirmed'
    const query = `
      UPDATE Bookings
      SET Booking_Status = 'Confirmed'
      WHERE Booking_ID = ? AND Booking_Status = 'Pending'; 
    `;
  
    connection.query(query, [bookingId], (err, results) => {
      if (err) {
        console.error('Error updating booking status:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Booking not found or already approved' });
      }
  
      return res.status(200).json({ message: 'Booking approved successfully' });
    });
  });

  router.put('/cancelBooking/:bookingId', (req, res) => {
    const { bookingId } = req.params;
  
    // SQL query to update the booking status to 'Cancelled'
    const cancelBookingQuery = `
      UPDATE Bookings
      SET Booking_Status = 'Cancelled'
      WHERE Booking_ID = ?
    `;
  
    connection.query(cancelBookingQuery, [bookingId], (err, results) => {
      if (err) {
        console.error('Error updating booking status:', err);
        return res.status(500).json({ message: 'Failed to cancel the booking.' });
      }
  
      // Check if the booking was found and updated
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Booking not found.' });
      }
  
      return res.json({ message: 'Booking successfully cancelled.' });
    });
  });
  
  
  module.exports = router;
