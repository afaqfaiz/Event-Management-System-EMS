import React from 'react';
import '../client-css/Sidebar.css';

const Sidebar = ({ onSectionChange }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSectionChange('profile')}>Profile</li>
        <li onClick={() => onSectionChange('bookings')}>Bookings</li>
        <li onClick={() => onSectionChange('payments')}>Payments</li>
        <li onClick={() => onSectionChange('halllisting')}>Halls</li>
        <li onClick={() => onSectionChange('policy')}>Company Policy</li>
      </ul>
    </div>
  );
};

export default Sidebar;
