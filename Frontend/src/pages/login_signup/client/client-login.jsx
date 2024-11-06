// client-login.js
import React, { useState } from 'react';
//import './client-login.css';

function ClientLoginPage() {
  const [clientName, setClientName] = useState('');
  const [clientPassword, setClientPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Client Name:', clientName);
    console.log('Client Password:', clientPassword);
  };

  return (
    <div className="container">
      <h1>Client Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="clientName">Client Name</label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientPassword">Password</label>
          <input
            type="password"
            id="clientPassword"
            value={clientPassword}
            onChange={(e) => setClientPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default ClientLoginPage;
