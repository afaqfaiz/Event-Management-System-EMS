import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HallList = () => {
    const [halls, setHalls] = useState([]);
    const [selectedHall, setSelectedHall] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        date: '',
        startTime: '',
        endTime: '',
        eventName: '',
        eventDescription: '',
        eventType: '',
        eventOrganizer: '',
        eventAttendees: '',
        // hours: '',
        // minutes: '',
    });
    const [message, setMessage] = useState('');

    // Fetch halls
    useEffect(() => {
        const fetchHalls = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/halls');
                setHalls(response.data);
            } catch (error) {
                console.error('Error fetching halls:', error);
            }
        };
        fetchHalls();
    }, []);

    const handleBookingChange = (e) => {
        setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
    };

    const handleBookClick = (hall) => {
        setSelectedHall(hall);
    };

    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        setMessage('');

        const totalHours = (new Date(`${bookingDetails.date}T${bookingDetails.endTime}`) - new Date(`${bookingDetails.date}T${bookingDetails.startTime}`)) / (1000 * 60 * 60);
        //const totalCost = totalHours * selectedHall.Price_per_Hour;
       //price per minute 
        const pricePerMinute = selectedHall.Price_per_Hour/ 60;

        try {
            const response = await axios.post('http://localhost:5000/api/bookings', {
                hallId: selectedHall.Hall_ID,
                clientId: localStorage.getItem('clientId'),
                startDateTime: `${bookingDetails.date} ${bookingDetails.startTime}`,
                endDateTime: `${bookingDetails.date} ${bookingDetails.endTime}`,
                companyId: selectedHall.Company_ID,
                eventduration:  (`${bookingDetails.date} ${bookingDetails.endTime}` -  `${bookingDetails.date} ${bookingDetails.startTime}`) / (1000 * 60),   //in minutes          //(new Date(`${bookingDetails.date}T${bookingDetails.endTime}`) - new Date(`${bookingDetails.date}T${bookingDetails.startTime}`)) / (1000 * 60 * 60),
                totalCost:totalHours *60 * pricePerMinute,
                bookingdate: new Date().toISOString().split('T')[0], 
                ...bookingDetails,
            });
           
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error creating booking:', error);
            setMessage('Failed to book hall. Please try again.');
        }
        setSelectedHall(null);
    };

    return (
        <div>
            <h2>Available Halls</h2>
            <ul>
                {halls.map((hall) => (
                    <li key={hall.Hall_ID}>
                        <p>{hall.Hall_name} - Capacity: {hall.Hall_Capacity} - Price: {hall.Price_per_Hour}/hour</p>
                        <button onClick={() => handleBookClick(hall)}>Book</button>
                    </li>
                ))}
            </ul>

            {selectedHall && (
                <div>
                    <h3>Book Hall: {selectedHall.Hall_name}</h3>
                    <form onSubmit={handleSubmitBooking}>
                        <div>
                            <label>Date:</label>
                            <input type="date" name="date"   onChange={handleBookingChange} required />
                        </div>
                        <div>
                            <label>Start Time:</label>
                            <input type="time" name="startTime"  onChange={handleBookingChange} required />
                        </div>
                        <div>
                            <label>End Time:</label>
                            <input type="time" name="endTime" onChange={handleBookingChange} required />
                        </div>
                        <div>
                            <label>Event Name:</label>
                            <input type="text" name="eventName" onChange={handleBookingChange} required />
                        </div>
                        <div>
                            <label>Event Description:</label>
                            <textarea name="eventDescription" onChange={handleBookingChange} required></textarea>
                        </div>
                        <div>
                            <label>Event Type:</label>
                            <input type="text" name="eventType" onChange={handleBookingChange} required />
                        </div>
                        <div>
                            <label>Organizer Name:</label>
                            <input type="text" name="eventOrganizer" onChange={handleBookingChange} required />
                        </div>
                        <div>
                            <label>Number of Attendees:</label>
                            <input type="number" name="eventAttendees" onChange={handleBookingChange} required />
                        </div>
                        {/* <div>
                            <label>Event Duration :</label>
                            <input type="hour" name="hours" id='hours' placeholder='hours' onChange={handleBookingChange} required />
                            <input type="minutes" name="minutes" id='minutes' placeholder='minutes' onChange={handleBookingChange} required />
                        </div> */}
                        <button type="submit">Submit Booking</button>
                    </form>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default HallList;
