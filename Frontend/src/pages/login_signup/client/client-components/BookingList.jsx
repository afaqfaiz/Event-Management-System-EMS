const BookingList = ({ bookings }) => {
    return (
        <div>
            <h2>Your Bookings</h2>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.Booking_ID}>
                            Event: {booking.Event_name} | Hall: {booking.Hall_name} | Date: {booking.Booking_Date} | Status: {booking.Status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default BookingList;
