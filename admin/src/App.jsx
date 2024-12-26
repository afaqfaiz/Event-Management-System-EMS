import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import AdminPanel from './Pages/adminDashboard';
import HallsDetail from './Pages/Halls';
import BookingsDetail from './Pages/Bookings';

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/halls" element={<HallsDetail />} />
        <Route path="/bookings" element={<BookingsDetail />} />
      </Routes>
  );
};

export default App;
