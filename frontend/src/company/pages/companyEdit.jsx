import React, { useState } from 'react';
import '../company-css/CompanyEditPage.css';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from 'react-router-dom';
const CompanyEditPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore();
  const data = user.user;

  const [companyDetails, setCompanyDetails] = useState({
    name: data.companyName,
    address: data.companyAddress,
    email: data.companyEmail,
    phone: data.companyContact,
    owner: data.companyOwner,
    imgurl: data.companyImgUrl,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    // Validate input fields
    if (
      !companyDetails.name ||
      !companyDetails.address ||
      !companyDetails.email ||
      !companyDetails.phone ||
      !companyDetails.owner ||
      !companyDetails.imgurl
    ) {
      setError('All fields are required.');
      return;
    }

    try {
      // Send the updated data to the backend
      const response = await fetch('http://localhost:5000/api/company/updatecompany', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId: data.companyId,
          name: companyDetails.name,
          address: companyDetails.address,
          email: companyDetails.email,
          phone: companyDetails.phone,
          owner: companyDetails.owner,
          imgurl: companyDetails.imgurl,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Company details updated successfully!');
        navigate('/company/dashboard');
      } else {
        setError(result.message || 'Failed to update company details.');
      }
    } catch (err) {
      setError('Error updating company details. Please try again.');
    }
  };

  return (
    <div className="edit-page">
      <h2>Edit Company Details</h2>
      {error && <p className="error">{error}</p>}
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
        <label>
          Owner:
          <input
            type="text"
            name="owner"
            value={companyDetails.owner}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imgurl"
            value={companyDetails.imgurl}
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
