// client-login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import './client-login.css';
//clientpagedetail
const ClientLoginPage = () => {
  const [clientEmail, setClientEmail] = useState('');
  const [clientPassword, setClientPassword] = useState('');
  const [error,setError]=useState('');
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try
    {
      const response=  await axios.post('http://localhost:5000/api/client/login', {
        Client_Email: clientEmail,
        Client_Password: clientPassword   
      });
      
      localStorage.setItem('clientemail',clientEmail);

      navigate('/clientpagedetail');

    }
    catch(err){
        setError(err.response?.data?.message || 'Login failed. Please try again.')
    }
    // Handle login logic here
    console.log('Client Emial:', clientEmail);
    console.log('Client Password:', clientPassword);
  };

  return (
    <div className="container">
      <h1>Client Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="clientEmail">Client Name</label>
          <input
            type="text"
            id="clientEmail"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default ClientLoginPage;
