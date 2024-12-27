import React, { useState, useEffect } from 'react';
import '../company-css/Halls.css';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const Halls = ({ navigateToPage }) => {
  const navigate = useNavigate();
  const [halls, setHalls] = useState([]); // Initialize state to hold the list of halls
  const [selectedHall, setSelectedHall] = useState(null);
  const companyId = 1; // You can get the companyId from your auth store or context

  // Fetch halls when the component mounts
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hall/gethalls/${companyId}`);
        setHalls(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching halls:', error);
      }
    };

    fetchHalls();
  }, []); // Only run this effect when companyId changes

  const handleDelete = async () => {
    try {
      // Call your API to delete the hall
      await axios.delete(`http://localhost:5000/api/hall/deletehalls/${selectedHall}`);
      setSelectedHall(null);
      navigate('/company/dashboard')
    } catch (error) {
      console.error('Error deleting hall:', error);
    }
  };

  const confirmDelete = (id) => {
    setSelectedHall(id);
  };

  const handleAddHall = () => {
    navigate('/company/addhall');
  };

  const handleEditHall = (hall) => {
    console.log("edit hall", hall);
    navigate('/company/updatehall', { state: { hallData: hall } });
  };

  return (
    <div className="halls-section">
      <div className="halls-header">
        <h2>Your Halls</h2>
        <button
          className="add-hall-btn"
          onClick={handleAddHall} //() => navigateToPage('add-hall'
        >
          Add Hall
        </button>
      </div>
      <div className="halls-list">
        {halls.map((hall) => (
          <div key={hall.Hall_ID} className="hall-card">
            <h3>{hall. Hall_name}</h3>
            <p>Location: {hall.Hall_location}</p>
            <p>Capacity: {hall.Hall_Capacity}</p>
            <p>Price/Hour: ${hall.Price_per_Hour}</p>
            <p>Rating: {hall.Hall_Rating} ★</p>
            <div className="hall-card-actions">
              <button
                className="btn update-btn"
                onClick={()=> handleEditHall(hall)}//() => navigateToPage('update-hall', hall)
              >
                Update
              </button>
              <button
                className="btn delete-btn"
                onClick={() => confirmDelete(hall.Hall_ID)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedHall && (
        <div className="delete-popup">
          <div className="popup-content">
            <p>
              Are you sure you want to delete <strong>{selectedHall.name}</strong>?
            </p>
            <button
              className="btn confirm-btn"
              onClick={() => handleDelete()}
            >
              Confirm Delete
            </button>

            <button
              className="btn cancel-btn"
              onClick={() => setSelectedHall(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Halls;
