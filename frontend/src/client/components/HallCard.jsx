import React from 'react';
import '../client-css/HallCard.css';

const HallCard = ({ hall, onBook }) => {
  return (
    <div className="hall-card">
      <h3 className="hall-name">{hall.Hall_name}</h3>
      <p><strong>Location:</strong> {hall.Hall_location}</p>
      <p><strong>Capacity:</strong> {hall.Hall_Capacity}</p>
      <p><strong>Price/Hour:</strong> ${hall. Price_per_Hour}</p>
      <p><strong>Rating:</strong> ⭐{hall.Hall_Rating}</p>
      <button className="btn book-btn" onClick={() => onBook(hall)}>Book Hall</button>
    </div>
  );
};

export default HallCard;
