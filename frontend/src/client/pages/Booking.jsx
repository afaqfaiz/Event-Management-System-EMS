import React from 'react';
import '../client-css/Booking.css';

const Bookings = ({ bookings }) => {
  const today = new Date();

  return (
    <div className="bookings">
      <h2>Bookings</h2>
      {bookings.map((booking) => (
        <div className="booking-card" key={booking.id}>
          <p><strong>Hall Name:</strong> {booking.hallName}</p>
          <p><strong>Company Name:</strong> {booking.companyName}</p>
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Event Name:</strong> {booking.eventName}</p>
          <p><strong>Event Date:</strong> {booking.eventDate}</p>
          <p><strong>Hall Location:</strong> {booking.hallLocation}</p>
          <p><strong>Payment:</strong> {booking.payment}</p>
          <p><strong>Status:</strong> {booking.paymentStatus}</p>
          {booking.paymentStatus === 'Unpaid' && (
            <div>
              <button className="btn pay-btn">Pay</button>
              {new Date(booking.eventDate) > today && (
                <button className="btn cancel-btn">Cancel</button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Bookings;
