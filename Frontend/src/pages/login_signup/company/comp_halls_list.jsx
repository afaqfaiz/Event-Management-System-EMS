import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HallList = () => {
    const [halls, setHalls] = useState([]);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const Company_ID = localStorage.getItem('companyid'); // Assuming you store Company_ID in localStorage

    useEffect(() => {
        const fetchHalls = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/company/halls/${Company_ID}`);
                setHalls(response.data);
            } catch (error) {
                console.error('Error fetching halls:', error);
                setErrorMessage('Failed to fetch halls.');
            }
        };

        fetchHalls();
    }, [Company_ID]);

    const handleDelete = async (Hall_ID) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/hall/${Hall_ID}`);
            setMessage(response.data.message);
            setHalls(halls.filter((hall) => hall.Hall_ID !== Hall_ID)); // Remove deleted hall from the list
        } catch (error) {
            console.error('Error deleting hall:', error);
            setErrorMessage('Failed to delete the hall. Please try again.');
        }
    };

    return (
        <div>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <ul>
                {halls.map((hall) => (
                    <li key={hall.Hall_ID}>
                        <p><strong>Name:</strong> {hall.Hall_name}</p>
                        <p><strong>Capacity:</strong> {hall.Hall_Capacity}</p>
                        <p><strong>Location:</strong> {hall.Hall_location}</p>
                        <p><strong>Price per Hour:</strong> {hall.Price_per_Hour}</p>
                        <button onClick={() => handleDelete(hall.Hall_ID)}>Delete Hall</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HallList;
