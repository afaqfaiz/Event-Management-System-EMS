import React from 'react';
import '../company-css/LogoutPopup.css';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../store/useAuthStore";
const LogoutPopup = ({ onClose }) => {
  const navigate = useNavigate();
   const {logout}=useAuthStore();
  const handleConfirmLogout = () => {
    logout();
    alert('Logged out successfully!');
    navigate('/')
  };

  return (
    <div className="logout-popup">
      <div className="popup-content">
        <p>Are you sure you want to log out?</p>
        <button className="btn confirm-logout-btn" onClick={handleConfirmLogout}>
          Confirm Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutPopup;
