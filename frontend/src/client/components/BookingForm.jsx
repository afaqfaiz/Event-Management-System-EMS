import React, { useState } from 'react';
import axios from 'axios';
import '../client-css/BookingForm.css';
import { useAuthStore } from '../../store/useAuthStore';

const BookingForm = ({ hall, onSubmit }) => {
  const user = useAuthStore();
  const Client_ID = user.user.clientId;
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookingDate || !startTime || !totalHours) {
      setError('All fields are required.');
      return;
    }

    setError('');
    const totalCost = parseFloat(hall.Price_per_Hour) * parseInt(totalHours, 10);
    const bookingData = {
      Hall_ID: hall.Hall_ID,
      Client_ID,
      Company_ID: hall.Company_ID,
      Booking_Date: new Date().toISOString().split('T')[0], // Today's date
      Event_Date: bookingDate,
      Event_Start_Time: startTime,
      Booking_Hours: parseInt(totalHours, 10),
      Total_Cost: totalCost,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/client/bookings/create',
        bookingData
      );
      console.log(response.data);
      setSuccess(true);
      setTimeout(() => {
        onSubmit();
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="booking-form">
      <h2>Book {hall.Hall_name}</h2>
      <p><strong>Location:</strong> {hall.Hall_location}</p>
      <p><strong>Price/Hour:</strong> ${hall.Price_per_Hour}</p>
      <p><strong>Capacity:</strong> {hall.Hall_Capacity}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Booking Date:
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          Total Hours:
          <input
            type="number"
            min="1"
            value={totalHours}
            onChange={(e) => setTotalHours(e.target.value)}
          />
        </label>
        <button type="submit" className="btn submit-btn">Submit</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Booking Successful! Redirecting...</p>}
      </form>
    </div>
  );
};

export default BookingForm;
