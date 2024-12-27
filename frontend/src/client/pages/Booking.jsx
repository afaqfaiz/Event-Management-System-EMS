import React, { useEffect, useState } from 'react';
import '../client-css/Booking.css';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = useAuthStore();
  const Client_ID = user.user.clientId;
  const today = new Date();

  // Fetch bookings by Client_ID
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/client/bookings/getByClient/${Client_ID}`);
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [Client_ID]);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="bookings">
      <h2>Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div className="booking-card" key={booking.Booking_ID}>
            <p><strong>Hall Name:</strong> {booking.Hall_name}</p>
            <p><strong>Company Name:</strong> {booking.Company_name}</p>
            <p><strong>Booking ID:</strong> {booking.Booking_ID}</p>
            <p><strong>Event Date:</strong> {booking.Event_Date}</p>
            <p><strong>Start Time:</strong> {booking.Event_Start_Time}</p>
            <p><strong>Total Hours:</strong> {booking.Booking_Hours}</p>
            <p><strong>Hall Location:</strong> {booking.Hall_location}</p>
            <p><strong>Total Cost:</strong> ${booking.Total_Cost}</p>
            <p><strong>Status:</strong> {booking.Booking_Status}</p>
            <p><strong>Payment:</strong> {booking.Payment_Status}</p>
            {booking.Payment_Status === 'Pending' && (
              <div>
                <button className="btn pay-btn">Pay</button>
                {new Date(booking.Event_Date) > today && (
                  <button className="btn cancel-btn">Cancel</button>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Bookings;
