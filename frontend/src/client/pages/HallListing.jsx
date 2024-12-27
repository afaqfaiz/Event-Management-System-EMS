import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HallCard from '../components/HallCard';
import '../client-css/HallListing.css';
import axios from 'axios';

const HallListing = () => {
  const navigate = useNavigate();
  const [halls, setHalls] = useState([]); // Initialize as an empty array
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/client/hall/gethalls`);
        setHalls(response.data || []); // Ensure the response is set as an array
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching hall data:', error);
      }
    };
    fetchHalls();
  }, []);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(searchInput.toLowerCase());
  };

  // Filtering halls based on name and location
  const filteredHalls = halls.filter(
    (hall) =>
      hall.Hall_name.toLowerCase().includes(searchQuery) ||
      hall.Hall_location.toLowerCase().includes(searchQuery)
  );

  const handleBookHall = (hall) => {
    navigate('/bookingform', { state: { hall } });
  };

  return (
    <div className="hall-listing">
      <h1>Available Halls</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchInput}
          onChange={handleInputChange}
        />
        <button className="search-btn" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      <div className="hall-list">
        {filteredHalls.length > 0 ? (
          filteredHalls.map((hall) => (
            <HallCard
              key={hall.Hall_ID} // Use Hall_ID from the API response
              hall={hall}
              onBook={handleBookHall}
            />
          ))
        ) : (
          <p>No halls found.</p>
        )}
      </div>
    </div>
  );
};

export default HallListing;
