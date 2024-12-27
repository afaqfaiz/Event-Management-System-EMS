import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import '../company-css/add-updatehalls.css';

const UpdateHall = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const location = useLocation();
  const hallDetails = location.state?.hallData;  // Assuming hallData is passed in the state
  const [formData, setFormData] = useState({
    ID: '',
    name: '',
    location: '',
    capacity: '',
    pricePerHour: '',
    rating: '',
  });



  useEffect(() => {
    if (hallDetails) {
      setFormData({
        ID: hallDetails.Hall_ID,  // Use the correct property from hallDetails
        name: hallDetails.Hall_name,
        location: hallDetails.Hall_location,
        capacity: hallDetails.Hall_Capacity,
        pricePerHour: hallDetails.Price_per_Hour,
        rating: hallDetails.Hall_Rating,
      });
    }
  }, [hallDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    if (
      !formData.ID ||
      !formData.name ||
      !formData.location ||
      !formData.capacity ||
      !formData.pricePerHour 
    ) {
      setError('All fields are required.');
      return;
    }
    try {
      // Sending the update request to the backend API
      const response = await fetch('http://localhost:5000/api/hall/updatehalls', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hallId: formData.ID,
          hallName: formData.name,
          hallLocation: formData.location,
          hallCapacity: formData.capacity,
          pricePerHour: formData.pricePerHour,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        
        alert('Hall updated successfully!');
        navigate('/company/dashboard');  
      } else {
        setError(data.message || 'Failed to update hall.');
      }
    } catch (err) {
      setError('Error updating hall. Please try again.');
    }
  };
  return (
    <div className="update-hall-container">
      <h2>Update Hall Details</h2>
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
        <button type="submit" className="submit-btn">
          Update Hall
        </button>
      </form>
    </div>
  );
};

export default UpdateHall;
