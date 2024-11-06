import React, { useState } from 'react';
import './comp-register.css';

function RegisterCompanyPage() {
  const [companyName, setCompanyName] = useState('');
  const [companyContact, setCompanyContact] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyOwner, setCompanyOwner] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');

  const registerCompany = async (companyData) => {
    try {
      const response = await fetch('http://localhost:5000/api/register/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });

      if (response.ok) {
        alert("Company registered successfully");
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
    const companyData = {
      companyName,
      companyContact,
      companyEmail,
      companyAddress,
      companyOwner,
      companyPassword,
      
    };
    console.log(companyAddress);
    registerCompany(companyData);
  };

  return (
    <div className="container">
      <h1>Register Company</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyContact">Company Contact</label>
          <input
            type="text"
            id="companyContact"
            value={companyContact}
            onChange={(e) => setCompanyContact(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyEmail">Company Email</label>
          <input
            type="email"
            id="companyEmail"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyAddress">Company Address</label>
          <input
            type="text"
            id="companyAddress"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyOwner">Company Owner</label>
          <input
            type="text"
            id="companyOwner"
            value={companyOwner}
            onChange={(e) => setCompanyOwner(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyPassword">Company Password</label>
          <input
            type="password"
            id="companyPassword"
            value={companyPassword}
            onChange={(e) => setCompanyPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterCompanyPage;