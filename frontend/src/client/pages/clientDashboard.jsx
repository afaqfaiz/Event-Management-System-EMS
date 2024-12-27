import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Profile from '../components/ProfileDetail';
import Bookings from './Booking';
import Payments from './Payment';
import HallListing from './HallListing';
import '../client-css/clientDashboard.css';
import { useAuthStore } from "../../store/useAuthStore";

const ClientProfile = () => {
  const user =useAuthStore();
  const data= user.user;
 
  const [section, setSection] = useState('profile');

  const clientDetails = {
    email: data.email,
    contact: data.contact,
    address: data.address,
  };

  const bookings = [
    // Add booking objects here
  ];

  const paymentHistory = [
    // Add payment history objects here
  ];

  const renderSection = () => {
    switch (section) {
      case 'profile':
        return <Profile clientDetails={clientDetails} />;
      case 'bookings':
        return <Bookings bookings={bookings} />;
      case 'payments':
        return <Payments paymentHistory={paymentHistory} />;
      case 'halllisting':
        return <HallListing  />;
      default:
        return <Profile clientDetails={clientDetails} />;
    }
  };

  return (
    <div className="client-profile">
          <div className='left'>
          <Sidebar onSectionChange={setSection} />
          </div>
      <div className="content">
        <Navbar name="John Doe" />
        {renderSection()}
      </div>
    </div>
  );
};

export default ClientProfile;
