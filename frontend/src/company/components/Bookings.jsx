import React, { useState, useEffect } from 'react';
import '../company-css/Bookings.css';
import { useAuthStore } from '../../store/useAuthStore';
import axios from 'axios';

const Bookings = () => {
  const user = useAuthStore();
  const company_id = user.user.companyId;
 

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch bookings for the company
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/company/bookings/getByCompany/${company_id}`);
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [company_id]);

  const handleApprove = async (bookingId) => {
    try {
      // Call API to approve booking
      const response = await axios.put(`http://localhost:5000/api/company/bookings/approveBooking/${bookingId}`);
      
      // Update the local state if the booking is successfully approved
      setBookings((prev) =>
        prev.map((booking) =>
          booking.Booking_ID === bookingId ? { ...booking, status: 'Confirmed' } : booking
        )
      );
      alert(response.data.message); // Show success message
    } catch (err) {
      console.error('Error approving booking:', err);
      setError('Failed to approve the booking.');
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      // Call API to cancel booking
      const response = await axios.put(`http://localhost:5000/api/company/bookings/cancelBooking/${bookingId}`);

      // Update the local state if the booking is successfully cancelled
      setBookings((prev) =>
        prev.map((booking) =>
          booking.Booking_ID === bookingId ? { ...booking, status: 'Cancelled' } : booking
        )
      );
      alert(response.data.message); // Show success message
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError('Failed to cancel the booking.');
    }
  };

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="bookings">
      <h2>All Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.Booking_ID} className="booking-card">
            <p><strong>Client: </strong> {booking.client}</p> 
            <p><strong>Booking ID: </strong> {booking.Booking_ID}</p>
            <p><strong>Hall: </strong> {booking.hall}</p>
            <p><strong>Event Date: </strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
            <p><strong>Event Start Time: </strong> {booking.eventStartTime}</p>
            <p><strong>Booking Hours: </strong> {booking.bookingHours} hr</p>
            <p><strong>Booking Date: </strong>{new Date(booking.bookingDate).toLocaleDateString()}</p>
            <p><strong>Booking Status: </strong> {booking.status}</p>
            <p><strong>Payment: </strong> {booking.paymentStatus}</p>
           

            {booking.status !== 'Cancelled' && (
            <button
              className={`btn ${booking.status === 'Confirmed' ? 'approved' : ''}`}
              disabled={booking.status === 'Confirmed'}
              onClick={() => handleApprove(booking.Booking_ID)}
            >
              {booking.status === 'Confirmed' ? 'Approved' : 'Approve'}
            </button>
            )}

            {booking.status !== 'Confirmed' && (
              <button
                className="btn cancel-btn"
                disabled={booking.status === 'Cancelled'}
                onClick={() => handleCancel(booking.Booking_ID)}
              >
                {booking.status === 'Cancelled' ? 'Cancelled' : 'Cancell'}
              </button>
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
