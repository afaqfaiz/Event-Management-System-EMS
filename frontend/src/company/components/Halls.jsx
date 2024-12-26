import React, { useState } from 'react';
import '../company-css/Halls.css';
import {useNavigate} from "react-router-dom";
const hallsData = [
  {
    id: 1,
    name: 'Grand Banquet Hall',
    location: 'Downtown City',
    capacity: 500,
    pricePerHour: 200,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Elegant Conference Hall',
    location: 'Uptown',
    capacity: 300,
    pricePerHour: 150,
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Royal Wedding Hall',
    location: 'Central Park',
    capacity: 700,
    pricePerHour: 250,
    rating: 4.8,
  },
];


const Halls = ({ navigateToPage }) => {
    const navigate = useNavigate();
  const [halls, setHalls] = useState(hallsData);
  const [selectedHall, setSelectedHall] = useState(null);

  const handleDelete = (id) => {
    setHalls((prevHalls) => prevHalls.filter((hall) => hall.id !== id));
    setSelectedHall(null);
  };

  const confirmDelete = (hall) => {
    setSelectedHall(hall);
  };
  const handleAddHall = () => {
    navigate('/add-hall');
  }

  const handleEditHall = (hall) => {
    console.log("edit hall", hall)
    navigate('/update-hall', { state: { hallData: hall } });
  }
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
          <div key={hall.id} className="hall-card">
            <h3>{hall.name}</h3>
            <p>Location: {hall.location}</p>
            <p>Capacity: {hall.capacity}</p>
            <p>Price/Hour: ${hall.pricePerHour}</p>
            <p>Rating: {hall.rating} ★</p>
            <div className="hall-card-actions">
              <button
                className="btn update-btn"
                onClick={()=> handleEditHall(hall)}//() => navigateToPage('update-hall', hall)
              >
                Update
              </button>
              <button
                className="btn delete-btn"
                onClick={() => confirmDelete(hall)}
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
              onClick={() => handleDelete(selectedHall.id)}
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
