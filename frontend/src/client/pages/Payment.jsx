import React from 'react';
import '../client-css/Payment.css';

const Payments = ({ paymentHistory }) => {
  return (
    <div className="payments">
      <h2>Payment History</h2>
      {paymentHistory.map((payment, index) => (
        <div className="payment-card" key={index}>
          <p><strong>Amount:</strong> {payment.amount}</p>
          <p><strong>Method:</strong> {payment.method}</p>
          <p><strong>Date:</strong> {payment.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Payments;
