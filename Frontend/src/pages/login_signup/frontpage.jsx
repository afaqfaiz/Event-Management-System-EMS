import React from 'react';
import { useNavigate } from 'react-router-dom';
import './frontpage.css';

function Frontpage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>EVENT MANAGEMENT SYSTEM</h1>
      <div className="buttons">
        <button onClick={() => navigate('./companyfront')}>Company</button>
        <button onClick={() => navigate('./clientfront')}>Client</button>
      </div>
    </div>
  );
}

export default Frontpage;
