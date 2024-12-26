import React from 'react';
import '../company-css/Payments.css';

const paymentsData = [
  { id: 1, amount: 500, method: 'Credit Card', date: '2024-01-05' },
  { id: 2, amount: 300, method: 'PayPal', date: '2024-01-10' },
  { id: 3, amount: 450, method: 'Bank Transfer', date: '2024-01-15' },
];

const Payments = () => {
  return (
    <div className="payments">
      <h2>All Payments Received</h2>
      {paymentsData.map((payment) => (
        <div key={payment.id} className="payment-card">
          <p><strong>Amount:</strong> ${payment.amount}</p>
          <p><strong>Method:</strong> {payment.method}</p>
          <p><strong>Date:</strong> {payment.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Payments;
