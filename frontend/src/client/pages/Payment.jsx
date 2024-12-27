import React, { useState, useEffect } from 'react';
import '../client-css/Payment.css';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

const Payments = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = useAuthStore();
  const Client_ID = user.user.clientId;
  console.log("client id",Client_ID);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payment/history/${Client_ID}`);
        setPaymentHistory(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching payment history:', err);
        setError('Failed to load payment history. Please try again later.');
        setLoading(false);
      }
    };

    fetchPayments();
  }, [Client_ID]);

  if (loading) {
    return <p>Loading payment history...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }
  const formatDate = (isoDateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoDateString).toLocaleDateString('en-US', options);
  };
  return (
    <div className="payments">
      <h2>Payment History</h2>
      {paymentHistory.length > 0 ? (
        paymentHistory.map((payment, index) => (
          <div className="payment-card" key={index}>
            <p><strong>Hall Name:</strong> {payment.Hall_Name}</p>
            <p><strong>Event Date:</strong>{formatDate(payment.Event_Date)}</p>
            <p><strong>Amount:</strong> ${payment.Amount}</p>
            <p><strong>Method:</strong> {payment.method}</p>
            <p><strong>Date:</strong>{formatDate(payment.date)}</p>
          </div>
        ))
      ) : (
        <p>No payment history found.</p>
      )}
    </div>
  );
};

export default Payments;
