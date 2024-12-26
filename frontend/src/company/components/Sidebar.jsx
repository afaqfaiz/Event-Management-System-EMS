import React from 'react';
import '../company-css/Sidebar.css';

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="sidebar">
      <h2>Company Dashboard</h2>
      <ul>
        <li onClick={() => setActiveSection('profile')}>Profile</li>
        <li onClick={() => setActiveSection('bookings')}>All Bookings</li>
        <li onClick={() => setActiveSection('payments')}>All Payments</li>
        <li onClick={() => setActiveSection('halls')}>Company's Halls</li>
      </ul>
    </div>
  );
};

export default Sidebar;
