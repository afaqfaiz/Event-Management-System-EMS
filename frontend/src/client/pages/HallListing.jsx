import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HallCard from '../components/HallCard';
import '../client-css/HallListing.css';

const halls = [
  {
    id: 1,
    image: 'hall1.jpg',
    name: 'Grand Hall',
    location: 'Downtown',
    capacity: 200,
    pricePerHour: 100,
    rating: 4.5,
  },
  {
    id: 2,
    image: 'hall2.jpg',
    name: 'Elegant Venue',
    location: 'Uptown',
    capacity: 150,
    pricePerHour: 80,
    rating: 4.2,
  },
  {
    id: 3,
    image: 'hall3.jpg',
    name: 'Skyline Banquet',
    location: 'City Center',
    capacity: 300,
    pricePerHour: 150,
    rating: 4.8,
  },
  {
    id: 4,
    image: 'hall4.jpg',
    name: 'Cozy Hall',
    location: 'Suburbs',
    capacity: 100,
    pricePerHour: 60,
    rating: 4.0,
  },
  {
    id: 5,
    image: 'hall5.jpg',
    name: 'Royal Venue',
    location: 'Downtown',
    capacity: 250,
    pricePerHour: 120,
    rating: 4.7,
  },
];

const HallListing = () => {
  const navigate = useNavigate();

  const handleBookHall = (hall) => {
    navigate('/bookingform', { state: { hall } });
  };

  return (
    <div className="hall-listing">
      <h1>Available Halls</h1>
      <div className="hall-list">
        {halls.map((hall) => (
          <HallCard key={hall.id} hall={hall} onBook={handleBookHall} />
        ))}
      </div>
    </div>
  );
};

export default HallListing;
