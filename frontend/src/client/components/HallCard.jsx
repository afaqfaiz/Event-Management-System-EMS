import React from 'react';
import '../client-css/HallCard.css';

const HallCard = ({ hall, onBook }) => {
  return (
    <div className="hall-card">
      <img src={hall.image} alt={hall.name} className="hall-image" />
      <h3 className="hall-name">{hall.name}</h3>
      <p><strong>Location:</strong> {hall.location}</p>
      <p><strong>Capacity:</strong> {hall.capacity}</p>
      <p><strong>Price/Hour:</strong> ${hall.pricePerHour}</p>
      <p><strong>Rating:</strong> ⭐{hall.rating}</p>
      <button className="btn book-btn" onClick={() => onBook(hall)}>Book Hall</button>
    </div>
  );
};

export default HallCard;
