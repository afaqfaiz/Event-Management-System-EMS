import React, { useState } from 'react';
import axios from 'axios';

const RegisterHall = () => {
    const [hallData, setHallData] = useState({
        Hall_name: '',
        Hall_Capacity: '',
        Hall_location: '',
        Price_per_Hour: ''
    });
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const Company_ID = localStorage.getItem('companyid'); // Assuming you store Company_ID in localStorage

    const handleChange = (e) => {
        setHallData({ ...hallData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors
        setMessage(''); // Clear previous success messages

        if (!Company_ID) {
            setMessage('Company ID is missing. Please log in again.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/hall/register', {
                ...hallData,
                Company_ID // Include the company ID from local storage
            });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Handle duplicate hall error
                setErrorMessage(error.response.data.error);
            }
            console.error('Error registering hall:', error);
            // setMessage('Failed to register hall. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register a New Hall</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Hall Name:</label>
                    <input
                        type="text"
                        name="Hall_name"
                        value={hallData.Hall_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Capacity:</label>
                    <input
                        type="number"
                        name="Hall_Capacity"
                        value={hallData.Hall_Capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="Hall_location"
                        value={hallData.Hall_location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price per Hour:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="Price_per_Hour"
                        value={hallData.Price_per_Hour}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register Hall</button>
            </form>
            {message && <p>{message}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default RegisterHall;
