import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import AdminPanel from './Pages/adminDashboard';
import HallsDetail from './Pages/Halls';
import BookingsDetail from './Pages/Bookings';
import LoginPage from './Pages/login';
import { useAuthStore } from './store/authStore';
const App = () => {
  const user  = useAuthStore();
  const admin= user.user;
  return (
   
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={admin ? <AdminPanel />:<LoginPage /> } />
        <Route path="/halls" element={<HallsDetail />} />
        <Route path="/bookings" element={<BookingsDetail />} />
      </Routes>
  );
};

export default App;
