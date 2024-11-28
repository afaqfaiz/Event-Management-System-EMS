const PaymentHistory = ({ payments }) => {
    return (
        <div>
            <h2>Your Payments</h2>
            {payments.length > 0 ? (
                <ul>
                    {payments.map((payment) => (
                        <li key={payment.id}>
                            Amount: {payment.amount} | Date: {payment.date} | Method: {payment.method}
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
