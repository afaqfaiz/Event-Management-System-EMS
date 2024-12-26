import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutPopup from './LogoutPopup.jsx';
import { useAuthStore } from "../../store/useAuthStore";
import '../company-css/Navbar.css';

const Navbar = () => {
  const user= useAuthStore();
  console.log("user",user.user.companyName);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/edit-company');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          src={user.user.companyImgUrl}
          alt="Company Logo"
          className="company-logo"
        />
        <h2 className="company-name">{user.user.companyName}</h2>
      </div>
      <div className="navbar-right">
        <button
          className="btn logout-btn"
          onClick={() => setShowLogoutPopup(true)}
        >
          Logout
        </button>
        <button className="btn edit-btn" onClick={handleEditClick}>
          Edit
        </button>
      </div>
      {showLogoutPopup && (
        <LogoutPopup onClose={() => setShowLogoutPopup(false)} />
      )}
    </div>
  );
};

export default Navbar;
