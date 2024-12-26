import React, { useState } from 'react';
import '../company-css/Bookings.css';

const bookingsData = [
  { id: 1, client: 'John Doe', hall: 'Grand Hall', status: 'Unpaid', approved: false },
  { id: 2, client: 'Jane Smith', hall: 'Elegant Venue', status: 'Paid', approved: true },
  { id: 3, client: 'Bob Johnson', hall: 'Skyline Banquet', status: 'Paid', approved: false },
];

const Bookings = () => {
  const [bookings, setBookings] = useState(bookingsData);

  const handleApprove = (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, approved: true } : booking
      )
    );
  };

  return (
    <div className="bookings">
      <h2>All Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="booking-card">
          <p><strong>Client:</strong> {booking.client}</p>
          <p><strong>Hall:</strong> {booking.hall}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <button
            className={`btn ${booking.approved ? 'approved' : ''}`}
            disabled={booking.approved}
            onClick={() => handleApprove(booking.id)}
          >
            {booking.approved ? 'Approved' : 'Approve'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
