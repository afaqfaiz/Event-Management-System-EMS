import React from 'react';
import '../company-css/Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <h2>Company Profile</h2>
      <p><strong>Name:</strong> Elegant Venues</p>
      <p><strong>Address:</strong> 123 Business Street, City</p>
      <p><strong>Email:</strong> contact@elegantvenues.com</p>
      <p><strong>Phone:</strong> +1 234 567 890</p>
    </div>
  );
};

export default Profile;
