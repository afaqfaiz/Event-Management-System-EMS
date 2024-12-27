import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../company-css/add-updatehalls.css';
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from 'react-router-dom';

const AddHall = ({ navigateToPage }) => {
  const navigate = useNavigate();
   const user= useAuthStore();
   console.log(user.user.companyId);
   const Id=user.user.companyId;
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    pricePerHour: '',
    rating: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    setFormData((prev) => ({ ...prev, companyId: Id }));
  }, [Id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.name ||
      !formData.location ||
      !formData.capacity ||
      !formData.pricePerHour ||
      !formData.rating ||
      !formData.companyId
    ) {
      setError('All fields are required.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/hall/addhalls', formData);
      console.log(response.data); // Log the response from the API

      // Assuming successful submission
      alert('Hall added successfully!');
      navigate('/company/dashboard');
    } catch (err) {
      console.error('Error adding hall:', err);
      setError('There was an error adding the hall.');
    }
  };

  return (
    <div className="add-hall-container">
      <h2>Add New Hall</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Hall Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter hall name"
        />
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
        />
        <label>Capacity</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Enter capacity"
        />
        <label>Price Per Hour</label>
        <input
          type="number"
          name="pricePerHour"
          value={formData.pricePerHour}
          onChange={handleChange}
          placeholder="Enter price per hour"
        />
        <label>Rating</label>
        <input
          type="number"
          step="0.1"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Enter rating (1-5)"
        />
        <button type="submit" className="submit-btn">
          Add Hall
        </button>
      </form>
    </div>
  );
};

export default AddHall;
