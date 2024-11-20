// client-register.js
import React, { useState } from 'react';
//import './client-register.css';

function RegisterClientPage() {
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientPassword, setClientPassword] = useState('');


  const registerClient = async (clientData) => {
    try {
      const response = await fetch('http://localhost:5000/api/register/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        alert("You registered successfully");
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error registering company:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientData = {
      clientName,
      clientContact,
      clientEmail,
      clientAddress,
      clientPassword,
      
    };
    console.log(clientName);
    console.log(clientContact)
    console.log(clientEmail)
    console.log(clientAddress)
    console.log(clientPassword)

    registerClient(clientData);
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log('Client Name:', clientName);
  //   console.log('Client Contact:', clientContact);
  //   console.log('Client Email:', clientEmail);
  //   console.log('Client Address:', clientAddress);
  //   console.log('Client Password:', clientPassword);
  //};

    return (
    <div className="container">
      <h1>Register Client</h1>
      <form onSubmit={handleSubmit} className="register-form">
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
          <label htmlFor="clientContact">Client Contact Number</label>
          <input
            type="text"
            id="clientContact"
            value={clientContact}
            onChange={(e) => setClientContact(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientEmail">Client Email</label>
          <input
            type="email"
            id="clientEmail"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientAddress">Client Address</label>
          <input
            type="text"
            id="clientAddress"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientPassword">Client Password</label>
          <input
            type="password"
            id="clientPassword"
            value={clientPassword}
            onChange={(e) => setClientPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterClientPage;
