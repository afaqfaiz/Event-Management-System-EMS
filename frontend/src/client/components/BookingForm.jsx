import React, { useState } from 'react';
import '../client-css/BookingForm.css';

const BookingForm = ({ hall, onSubmit }) => {
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingDate || !startTime || !totalHours) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setSuccess(true);
    setTimeout(() => {
      onSubmit();
    }, 5000);
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
