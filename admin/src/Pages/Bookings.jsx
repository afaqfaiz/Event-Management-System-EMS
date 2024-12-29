import React, { useEffect, useState } from 'react';
import '../admin.css/Booking.css';
import { useLocation } from 'react-router-dom';

const BookingsDetail = () => {
  const location = useLocation();
  const { companyId, companyName } = location.state || {};
  console.log("id",companyId);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/booking/getbookings/${companyId}`);
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
          console.log("booking data",data);
        } else {
          console.error('Failed to fetch bookings.');
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchBookings();
    }
  }, []);

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  return (
    <div className="bookings-detail">
      <h2>Bookings for {companyName}</h2>
      <div className="bookings-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.hallName}</h3>
              <p>Client: {booking.clientName}</p>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Total Cost: ${booking.totalCost}</p>
              <p>Payment Status: {booking.paymentStatus}</p>
              <p>Status: {booking.bookingStatus}</p>
            </div>
          ))
        ) : (
          <p>No bookings found for this company.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsDetail;
