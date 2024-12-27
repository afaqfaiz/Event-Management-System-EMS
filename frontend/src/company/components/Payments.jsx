import React, { useState, useEffect } from 'react';
import '../company-css/Payments.css';
import { useAuthStore } from '../../store/useAuthStore';
import axios from 'axios';

const Payments = () => {
  const user = useAuthStore();
  const company_id = user.user.companyId; // Get company ID from auth store

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch payments data for the company
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/company/payment/getPaymentsByCompany/${company_id}`);
        setPayments(response.data); // Set the fetched payments
        setLoading(false); // Stop loading
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to load payments. Please try again later.');
        setLoading(false);
      }
    };

    fetchPayments();
  }, [company_id]);

  if (loading) {
    return <p>Loading payments...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="payments">
      <h2>All Payments Received</h2>
      {payments.length > 0 ? (
        payments.map((payment) => (
          <div key={payment.Payment_ID} className="payment-card">
            <p><strong>Client Name:</strong> {payment.clientname}</p>
            {/* <p><strong>Event Name:</strong> {payment.eventname}</p> */}
            <p><strong>Booking ID:</strong> {payment.Booking_ID}</p>
            <p><strong>Hall Name:</strong> {payment.hallname}</p>
            <p><strong>Amount:</strong> ${payment.amount}</p>
            <p><strong>Method:</strong> {payment.method}</p>
            <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
};

export default Payments;
