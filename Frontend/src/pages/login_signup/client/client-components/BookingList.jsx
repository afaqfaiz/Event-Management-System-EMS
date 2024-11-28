import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const BookingList = ({ bookings }) => {
    
    //console.log("im in bookinglist",bookings);
    const clientId =localStorage.getItem("clientId");
    //console.log( "this client",clientId);
    const navigate=useNavigate();
    const handlepayment = (BookingID,bookingcost)=>{

        // console.log("payment button clicked by client id ",clientId);
        // console.log("booking id",BookingID);
        // console.log("booking cost",bookingcost);
        // console.log("something here....",clientId);
        // console.log("bo",BookingID);
        // console.log("cost",bookingcost);
        navigate('/payment',{ state:{clientId: clientId, Bookingid: BookingID, bookingcost: bookingcost}});


    }

    return (
        <div>
            <button ><Link to="/clienthallList" style={{color:'white'}}>View and Book Halls</Link ></button>
            <h2>Your Bookings</h2>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        
                        <li key={booking.id}> Booking ID:{booking.id} | 
                            Event: {booking.eventName} | Hall: {booking.hallName} | Event Date: {(new Date(booking.startTime)).toISOString().split('T')[0]} | Status: {booking.paymentstatus}
                            <br />
                            {booking.paymentstatus === "Unpaid" && (
                            <button data-id={booking.id} onClick={(e)=>{
                                //console.log('Data-ID:', e.target.getAttribute('data-id'));
                                const id = e.currentTarget.getAttribute('data-id');
                                //console.log('1Booking ID:',id);
                                console.log("here", booking.id)
                                  handlepayment(booking.id,booking.totalCost);
                               }}
                               >Pay</button>
                            )}
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
