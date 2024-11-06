import React from 'react';
import { useNavigate } from 'react-router-dom';
import './comp-front.css';

function CompanyPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>EVENT MANAGEMENT SYSTEM</h1>
      <div className="buttons">
        <button onClick={() => navigate('/compregister')}>Register as Company</button>
        <button onClick={() => navigate('/complogin')}>Login</button>
      </div>
    </div>
  );
}

export default CompanyPage;
