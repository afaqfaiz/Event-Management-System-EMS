const PaymentHistory = ({ payments }) => {
    return (
        <div>
            <h2>Your Payments</h2>
            {payments.length > 0 ? (
                <ul>
                    {payments.map((payment) => (
                        <li key={payment.Payment_ID}>
                            Amount: {payment.Amount} | Date: {payment.Payment_Date} | Method: {payment.Payment_Method}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No payment history found.</p>
            )}
        </div>
    );
};

export default PaymentHistory;
