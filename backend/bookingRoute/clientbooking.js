const express = require('express');
const router = express.Router();
const { connection } = require('../db'); // Import the connection from db.js

// Endpoint to create a booking
router.post('/create', (req, res) => {
  const {
    Hall_ID,
    Client_ID,
    Company_ID,
    Booking_Date,
    Event_Date,
    Event_Start_Time,
    Booking_Hours,
    Total_Cost,
  } = req.body;

  // Validate input
  if (
    !Hall_ID ||
    !Client_ID ||
    !Company_ID ||
    !Event_Date ||
    !Event_Start_Time ||
    !Booking_Hours ||
    !Total_Cost
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Default Booking_Date to the current date if not provided
  const bookingDate = Booking_Date || new Date().toISOString().split('T')[0];

  const query = `
    INSERT INTO Bookings (
      Hall_ID, Client_ID, Company_ID, Booking_Date, 
      Event_Date, Event_Start_Time, Booking_Hours, Total_Cost
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    Hall_ID,
    Client_ID,
    Company_ID,
    bookingDate,
    Event_Date,
    Event_Start_Time,
    Booking_Hours,
    Total_Cost,
  ];

  // Execute query
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error creating booking:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({
      message: 'Booking created successfully',
      bookingId: results.insertId,
    });
  });
});

// Endpoint to fetch all bookings
router.get('/get', (req, res) => {
  const query = 'SELECT * FROM Bookings';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json(results);
  });
});

// Endpoint to fetch a specific booking by ID
router.get('/get/:id', (req, res) => {
  const bookingId = req.params.id;
  const query = 'SELECT * FROM Bookings WHERE Booking_ID = ?';

  connection.query(query, [bookingId], (err, results) => {
    if (err) {
      console.error('Error fetching booking:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res.status(200).json(results[0]);
  });
});

// Endpoint to update a booking
router.put('/update/:id', (req, res) => {
  const bookingId = req.params.id;
  const {
    Event_Date,
    Event_Start_Time,
    Booking_Hours,
    Total_Cost,
    Booking_Status,
    Payment_Status,
  } = req.body;

  const query = `
    UPDATE Bookings 
    SET Event_Date = ?, Event_Start_Time = ?, Booking_Hours = ?, 
        Total_Cost = ?, Booking_Status = ?, Payment_Status = ? 
    WHERE Booking_ID = ?
  `;
  const values = [
    Event_Date,
    Event_Start_Time,
    Booking_Hours,
    Total_Cost,
    Booking_Status,
    Payment_Status,
    bookingId,
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error updating booking:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res.status(200).json({ message: 'Booking updated successfully' });
  });
});

// Endpoint to delete a booking
router.delete('/delete/:id', (req, res) => {
  const bookingId = req.params.id;
  const query = 'DELETE FROM Bookings WHERE Booking_ID = ?';

  connection.query(query, [bookingId], (err, results) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res.status(200).json({ message: 'Booking deleted successfully' });
  });
});

//get bookings by clientid
// Endpoint to fetch all bookings for a specific client
router.get('/getByClient/:clientId', (req, res) => {
    const clientId = req.params.clientId;
  
    // Modify the query to join the Bookings, Hall, and Company tables
    const query = `
      SELECT 
        b.Booking_ID, 
        b.Hall_ID, 
        b.Client_ID, 
        b.Company_ID, 
        b.Booking_Date, 
        b.Event_Date, 
        b.Event_Start_Time, 
        b.Booking_Hours, 
        b.Total_Cost, 
        b.Booking_Status, 
        b.Payment_Status, 
        h.Hall_location, 
        h.Hall_name,
        c.Company_name  -- Add the company name from the Company table
      FROM Bookings b
      INNER JOIN Hall h ON b.Hall_ID = h.Hall_ID
      INNER JOIN Company c ON b.Company_ID = c.Company_ID  -- Join with the Company table
      WHERE b.Client_ID = ?
    `;
  
    connection.query(query, [clientId], (err, results) => {
      if (err) {
        console.error('Error fetching bookings for client:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'No bookings found for the specified client.' });
      }
  
      return res.status(200).json(results);
    });
  });
  

module.exports = router;
