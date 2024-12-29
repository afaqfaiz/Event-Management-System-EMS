import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../admin.css/halls.css';

const HallsDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { companyId, companyName } = location.state || {};
  const [hallsData, setHallsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/hall/gethalls/${companyId}`);
        const data = await response.json();

        if (response.ok) {
          setHallsData(data);
        } else {
          setError(data.message || 'Failed to fetch halls.');
        }
      } catch (err) {
        setError('Failed to connect to the server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchHalls();
    }
  }, [companyId]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this hall?');
    if (confirm) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/hall/deletehall/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert('Hall deleted successfully!');
          // Optionally, refresh the list of halls
          window.location.reload();
        } else {
          const data = await response.json();
          alert(data.message || 'Failed to delete the hall.');
        }
      } catch (err) {
        console.error('Error deleting hall:', err);
        alert('Failed to connect to the server. Please try again later.');
      }
    }
  };

  return (
    <div className="halls-detail">
      <h2>Halls for Company: {companyName}</h2>
      <button
        className="add-hall-btn"
        onClick={() => navigate('/add-hall', { state: { companyId } })}
      >
        Add New Hall
      </button>
      {loading ? (
        <p>Loading halls...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : hallsData.length > 0 ? (
        <div className="halls-list">
          {hallsData.map((hall) => (
            <div key={hall.Hall_ID} className="hall-card">
              <h3>{hall.Hall_name}</h3>
              <p>Location: {hall.Hall_location}</p>
              <p>Capacity: {hall.Hall_Capacity}</p>
              <p>Price/Hour: ${hall.Price_per_Hour}</p>
              <p>Rating: {hall.Hall_Rating}⭐</p>
              <div className="actions">
                <button onClick={() => handleDelete(hall.Hall_ID)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No halls found.</p>
      )}
    </div>
  );
};

export default HallsDetail;
