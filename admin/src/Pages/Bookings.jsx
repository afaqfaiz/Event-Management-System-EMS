import React from 'react';
import '../admin.css/Booking.css'

const bookingsData = [
  {
    id: 1,
    clientName: 'John Doe',
    hallName: 'Grand Ballroom',
    date: '2024-12-30',
    time: '18:00 - 22:00',
    paymentStatus: 'Paid',
    status: 'Approved',
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    hallName: 'Conference Room A',
    date: '2025-01-05',
    time: '09:00 - 13:00',
    paymentStatus: 'Unpaid',
    status: 'Pending',
  },
];

const BookingsDetail = () => {
  const handleApprove = (id) => {
    alert(`Booking with ID ${id} approved!`);
    // Implement approval logic here
  };

  return (
    <div className="bookings-detail">
      <h2>Bookings for Company</h2>
      <div className="bookings-list">
        {bookingsData.map((booking) => (
          <div key={booking.id} className="booking-card">
            <h3>{booking.hallName}</h3>
            <p>Client: {booking.clientName}</p>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
            <p>Payment Status: {booking.paymentStatus}</p>
            <p>Status: {booking.status}</p>
            {booking.status === 'Pending' && (
              <button onClick={() => handleApprove(booking.id)} className="approve-btn">
                Approve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsDetail;
