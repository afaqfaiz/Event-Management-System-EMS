import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Payment = () => {
    //const [method, setMethod]=useState('');
    const navigate = useNavigate();
    const location=useLocation();
    const [Message,setMessage]=useState('')
    const[error,seterror]=useState('');
    const {clientId,Bookingid,bookingcost}=location.state || {};
    const handlepayment = async (method)=>{
        try
        {
            const response= await axios.post('http://localhost:5000/api/makepayment',{
                clientId:clientId,
                Bookingid:Bookingid,
                bookingcost:bookingcost,
                paymentmethod:method,
            })
            setMessage(response.data.message+'🥳');
            seterror('');
            await sleep(2000);
            navigate('/clientpagedetail');


        }
        catch(error)
        {
            seterror("error occured, Try again😞")
        }
        

    }
    return(
        <div>
             <h1>Make Payment </h1>
             <label htmlFor="paymentMthod">Select Payment Method:</label>
             <div>
                <ul>
                    <button onClick={()=>handlepayment('Easyvalut')} >Easy Valut</button>
                    <button onClick={()=>handlepayment('Master Card')}>Master Card</button>
                    <button onClick={()=>handlepayment('Cash')}>Cash</button>
                </ul>
             </div>
             <h1>Booking ID: {Bookingid}</h1>
             <h1>Booking Cost: {bookingcost}</h1>
             <br />
             {Message && <p style={{ color: "green" }}>{Message}</p>}
             {error && <p style={{ color: "red" }}>{error}</p>}

        </div>
       
    );
}
export default Payment;