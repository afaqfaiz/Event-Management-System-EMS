import React, { useState } from 'react';
import '../company-css/CompanyEditPage.css';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from "../../store/useAuthStore";

const CompanyEditPage = () => {
   const user= useAuthStore();
   const data =user.user;

  const [companyDetails, setCompanyDetails] = useState({
    name: data.companyName,
    address: data.companyAddress,
    email: data.companyEmail,
    phone: data.companyContact,
    owner:data.companyOwner,
    imgurl:data.companyImgUrl,
    
  });
  console.log("ata in edit",companyDetails);

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
