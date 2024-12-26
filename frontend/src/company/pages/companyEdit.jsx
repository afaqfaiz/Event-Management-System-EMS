import React, { useState } from 'react';
import '../company-css/CompanyEditPage.css';

const CompanyEditPage = () => {
  const [companyDetails, setCompanyDetails] = useState({
    name: 'Elegant Venues',
    address: '123 Business Street, City',
    email: 'contact@elegantvenues.com',
    phone: '+1 234 567 890',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    alert('Company details updated successfully!');
  };

  return (
    <div className="edit-page">
      <h2>Edit Company Details</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={companyDetails.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={companyDetails.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={companyDetails.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={companyDetails.phone}
            onChange={handleChange}
          />
        </label>
        <button type="button" className="btn update-btn" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

export default CompanyEditPage;
