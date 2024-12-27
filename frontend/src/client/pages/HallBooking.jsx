import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
//import '../client-css/HallBooking.css';

const HallBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hall } = location.state;

  const handleSuccess = () => {
    navigate('/client/dashboard')
  };

  return (
    <div className="hall-booking">
      <BookingForm hall={hall} onSubmit={handleSuccess} />
    </div>
  );
};

export default HallBooking;
