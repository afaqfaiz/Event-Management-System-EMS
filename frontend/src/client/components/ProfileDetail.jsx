import React from 'react';
import '../client-css/ProfileDet.css';

const Profile = ({ clientDetails }) => {
  const { email, contact, address, totalBookings, paymentPending } = clientDetails;

  return (
    <div className="profile">
      <h2>Client Details</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Contact:</strong> {contact}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Total Bookings:</strong> {totalBookings}</p>
      <p><strong>Payment Pending:</strong> {paymentPending}</p>
    </div>
  );
};

export default Profile;
