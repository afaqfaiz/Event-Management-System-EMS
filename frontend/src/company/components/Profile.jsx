import React from 'react';
import '../company-css/Profile.css';
import { useAuthStore } from "../../store/useAuthStore";

const Profile = () => {
  const user= useAuthStore();
  return (
    <div className="profile">
      <h2>Company Profile</h2>
      <p><strong>Name:</strong> {user.user.companyName}</p>
      <p><strong>Address:</strong>  {user.user.companyAddress}</p>
      <p><strong>Email:</strong>{user.user.companyEmail}</p>
      <p><strong>Phone:</strong>{user.user.companyContact}</p>
    </div>
  );
};

export default Profile;
