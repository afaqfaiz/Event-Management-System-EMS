import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ClientInfo from './client-components/ClientInfo';
import BookingList from './client-components/BookingList';
import PaymentHistory from './client-components/PaymentHistory';


const ClientDashboard = () => {
    const [client, setClient] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        const clientemail = localStorage.getItem('clientemail');
        // Fetch client details
        const fetchClientData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/client-details/${clientemail}`);
                // setClient(response.data.client);
                // setBookings(response.data.bookings);
                // setPayments(response.data.payments);;
                //console.log(response.data.client);
                setClient(response.data.client); // Updated to match new "client" key
                setBookings(response.data.bookings); // Updated to match new "bookings" key
                setPayments(response.data.payments); // Updated to match new "payments" key
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        fetchClientData();
    }, []);
    if (!client) return <p>Loading...</p>;
    return (
        <div>
            <h1>Client Dashboard</h1>
            <ClientInfo client={client} />
            <BookingList bookings={bookings} />
            <PaymentHistory payments={payments} />
           
        </div>
    );
};

export default ClientDashboard;
