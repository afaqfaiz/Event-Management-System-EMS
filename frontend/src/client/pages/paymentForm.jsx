import React, { useState } from 'react';
import axios from 'axios';
import '../client-css/paymentform.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const booking = location.state;
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!paymentMethod) {
      setError('Please select payment method .');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/payment/processPayment', {
        Booking_ID: booking.Booking_ID,
        Client_ID: booking.Client_ID,
        Amount: booking.Total_Cost,
        Payment_Method: paymentMethod
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
        }, 2000);
        navigate('/client/dashboard')
      } else {
        setError(response.data.error || 'Payment failed, please try again.');
      }
    } catch (error) {
      setError('An error occurred, please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="payment-form">
      <h2>Payment for {booking.Hall_name}</h2>
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Payment Method:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </label>
        <label>
          Amount:
          <input
            className='amount'
            type="number"
            value={booking.Total_Cost}
            readOnly
          />
        </label>
        <button type="submit" disabled={loading} className="btn pay-btn">
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Payment Successful! Booking Confirmed!</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
