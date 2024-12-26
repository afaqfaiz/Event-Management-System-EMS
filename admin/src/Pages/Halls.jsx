import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../admin.css/halls.css'

const HallsDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hallsData = location.state?.halls || [
    // Hardcoded example data
    {
      id: 1,
      name: 'Grand Ballroom',
      location: 'Downtown',
      capacity: 300,
      pricePerHour: 500,
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Conference Room A',
      location: 'Business District',
      capacity: 50,
      pricePerHour: 200,
      rating: 4.0,
    },
  ];

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this hall?');
    if (confirm) {
      alert(`Hall with ID ${id} deleted!`);
      // Implement delete logic here
    }
  };

  return (
    <div className="halls-detail">
      <h2>Halls for Company</h2>
      <button
        className="add-hall-btn"
        onClick={() => navigate('/add-hall', { state: { companyId: location.state?.companyId } })}
      >
        Add New Hall
      </button>
      <div className="halls-list">
        {hallsData.map((hall) => (
          <div key={hall.id} className="hall-card">
            <h3>{hall.name}</h3>
            <p>Location: {hall.location}</p>
            <p>Capacity: {hall.capacity}</p>
            <p>Price/Hour: ${hall.pricePerHour}</p>
            <p>Rating: {hall.rating}⭐</p>
            <div className="actions">
              <button
                onClick={() =>
                  navigate('/update-hall', { state: { hall } })
                }
              >
                Update
              </button>
              <button onClick={() => handleDelete(hall.id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HallsDetail;
