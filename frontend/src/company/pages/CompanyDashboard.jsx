import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Bookings from '../components/Bookings';
import Payments from '../components/Payments';
import Halls from '../components/Halls';
import '../company-css/CompanyDashboard.css';

const CompanyDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'bookings':
        return <Bookings />;
      case 'payments':
        return <Payments />;
        case 'halls':
            return <Halls />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar setActiveSection={setActiveSection} />
      </div>
      <div className="main-container">
      <Navbar />
        <div className="content-container">{renderContent()}</div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
