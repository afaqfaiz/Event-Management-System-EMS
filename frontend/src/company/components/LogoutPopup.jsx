import React from 'react';
import '../company-css/LogoutPopup.css';

const LogoutPopup = ({ onClose }) => {
  const handleConfirmLogout = () => {
    alert('Logged out successfully!');
    onClose();
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
