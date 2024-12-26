import React, { useState } from 'react';
import '../company-css/add-updatehalls.css';

const AddHall = ({ navigateToPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    pricePerHour: '',
    rating: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.location ||
      !formData.capacity ||
      !formData.pricePerHour ||
      !formData.rating
    ) {
      setError('All fields are required.');
      return;
    }
    // Assuming successful submission
    alert('Hall added successfully!');
    navigateToPage('halls');
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
