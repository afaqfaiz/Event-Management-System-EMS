// client-front.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './client-front.css';

function ClientPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>EVENT MANAGEMENT SYSTEM - Client</h1>
      <div className="buttons">
        <button onClick={() => navigate('/clientregister')}>Register as Client</button>
        <button onClick={() => navigate('/clientlogin')}>Login</button>
      </div>
    </div>
  );
}

export default ClientPage;
