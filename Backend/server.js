// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');  // Import database connection

const app = express();
app.use(cors());
app.use(express.json());

//const routes= require('./ClientRoutes/routes');

//app.use('/api/postpayment',routes);

const PORT = process.env.PORT || 5000;

// Define routes here
app.get('/', (req, res) => {
    res.send('Event Management API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//select all companies
app.get('/api/companies', (req, res) => {
    db.query('SELECT * FROM Company', (err, results) => {
        if (err) {
            console.error('Error fetching companies:', err); // Log error to console
            res.status(500).send({ error: 'Database query error' });
        } else {
            console.log('Fetched companies:', results); // Log results to console
            res.json(results);
        }
    });
});
//select all from clients
app.get('/api/clients', (req, res) => {
    db.query('SELECT * FROM Clients', (err, results) => {
        if (err) {
            console.error('Error fetching Clients:', err); // Log error to console
            res.status(500).send({ error: 'Database query error' });
        } else {
            console.log('Fetched Clients:', results); // Log results to console
            res.json(results);
        }
    });
});

//select from company by id 
app.get('/api/companies1', (req, res) => {
    db.query('SELECT * FROM Company where  Company_ID = 3', (err, results) => {

        if (err) {
            console.error('Error fetching companies:', err); // Log error to console
            res.status(500).send({ error: 'Database query error' });
        } else {
            console.log('Fetched companies:', results); // Log results to console
            res.json(results);
        }
    });
});


//------------------------------------------- Route for company registration--------------------------------------------------------------------------------
app.post('/api/register/company', (req, res) => {
    const {
        companyName: Company_Name,
      companyContact: Company_Contact,
      companyEmail: Company_Email,
      companyAddress: Company_Address,
      companyOwner: Company_Owner,
      companyPassword: Company_password
     } = req.body;
 
    // Query to insert the new company user
    db.query(
        'INSERT INTO Company (Company_Name,Company_Contact,Company_Email,Company_Address,Company_Owner,Company_password) VALUES (?, ?, ?,?,?,?)',
        [Company_Name,Company_Contact,Company_Email,Company_Address,Company_Owner,Company_password],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send("Username already exists.");
                }
                return res.status(500).send(err);
            }
            res.status(201).send("Company registered successfully");
        }
    );
});



//------------------------------------------- Route for company login-------------------------------------------------------------------------------

//----------------company login authentication
app.post('/api/company/login', (req, res) => {
    const { Company_Email, Company_password } = req.body;
    // Company_password=password;
    // Company_Email=email;
    console.log(Company_Email);
    console.log(Company_password);
    if (!Company_Email || !Company_password) {
        return res.status(400).send('email and password are required');
    }

    const query = 'SELECT * FROM Company WHERE Company_Email = ? AND Company_password = ?';
    db.query(query, [Company_Email, Company_password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            res.status(200).send('Login successful!');
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
});

//----------------company data fetching

app.get('/api/company/data/:email',(req,res)=>{
    const Company_Email= req.params.email;
    console.log('Received request for email:', Company_Email);
    //first fetch the company name and id 
    const nameidquery='select * from Company where Company_Email=?';
    db.query(nameidquery,[Company_Email],(err,result)=>{
        if(err){
            console.error('Error executing query:',err);
            return res.status(500).json({error: 'server error'});
        }
        console.log('Query Result:', result);
        if(result.length>0){
            console.log('Query Result:', result);
            res.json({
                Company_Name:result[0].Company_Name,
                Company_ID:result[0].Company_ID,
                Company_Email:result[0].Company_Email,
                Company_Owner:result[0].Company_Owner,
                Company_Contact:result[0].Company_Contact,
                Company_Address:result[0].Company_Address,

            });  
        }
        else{
            return res.status(404).json({error: 'company not found'});
            console.log("not found");
        }
    })
})

//------------------- get the comapany halls by company id
app.get('/api/company/halls/:id',(req,res)=>{
    const Company_ID=req.params.id;
    console.log('Received request for company id:', Company_ID);
    const queryhalls= 'select * from Hall where Company_ID=?';
    db.query(queryhalls,[Company_ID],(err,result)=>{
        if(err){
            console.error("error fetching halls",err);
            return res.status(500).json({ error: 'Database error' })
        }
        
        return res.json(result);
    })
})

//--------------------register halls by comapny id 
app.post('/api/hall/register', (req, res) => {
    const { Company_ID, Hall_name, Hall_Capacity, Hall_location, Price_per_Hour } = req.body;

    if (!Company_ID || !Hall_name || !Hall_Capacity || !Hall_location || !Price_per_Hour) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // First, check if the hall already exists for this company
    const checkQuery = `SELECT * FROM Hall WHERE Company_ID = ? AND Hall_name = ?`;

    db.query(checkQuery, [Company_ID, Hall_name], (err, result) => {
        if (err) {
            console.error('Error checking existing hall:', err);
            return res.status(500).json({ error: 'Database error while checking hall' });
        }

        if (result.length > 0) {
            // Hall with the same name already exists
            return res.status(409).json({ error: 'Hall with this name already exists for the company' });
        }
        else
        {
                // Proceed to insert the hall if it doesn't already exist
                const insertQuery = `
                    INSERT INTO Hall (Company_ID, Hall_name, Hall_Capacity, Hall_location, Price_per_Hour) 
                    VALUES (?, ?, ?, ?, ?)
                `;

                db.query(insertQuery, [Company_ID, Hall_name, Hall_Capacity, Hall_location, Price_per_Hour], (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error('Error inserting hall:', insertErr);
                        return res.status(500).json({ error: 'Database error while registering hall' });
                    }

                    res.status(201).json({ message: 'Hall registered successfully', hallID: insertResult.insertId });
                });
        }
    });
});


//-------------delete hall by id
app.delete('/api/hall/:id', (req, res) => {
    const Hall_ID = req.params.id;

    const query = `DELETE FROM Hall WHERE Hall_ID = ?`;

    db.query(query, [Hall_ID], (err, result) => {
        if (err) {
            console.error('Error deleting hall:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Hall not found' });
        }

        res.status(200).json({ message: 'Hall deleted successfully' });
    });
});





//----------------------client-----------------------------------------------------------------------------

//------------client registration

app.post('/api/register/client', (req, res) => {
    const {
        clientName: Client_Name,
        clientContact: Client_ContactNumber,
        clientEmail: Client_Email,
        clientAddress: Client_Address,
      clientPassword: Client_Password
     } = req.body;
     console.log(req.body);
    // Query to insert the new client user
    db.query(
        'INSERT INTO  Clients (Client_Name,Client_ContactNumber,Client_Email,Client_Address,Client_Password) VALUES (?, ?, ?,?,?)',
        [Client_Name,Client_ContactNumber,Client_Email,Client_Address,Client_Password],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send("Username already exists.");
                }
                return res.status(500).send(err);
            }
            res.status(201).send("User registered successfully");
        }
    );
});

//---------------------client authentication
app.post('/api/client/login', (req, res) => {
    const { Client_Email, Client_Password } = req.body;
    console.log(Client_Email);
    console.log(Client_Password);
    if (!Client_Email || !Client_Password) {
        return res.status(400).send('email and password are required');
    }

    const query = 'SELECT * FROM Clients WHERE Client_Email = ? AND Client_Password = ?';
    db.query(query, [Client_Email, Client_Password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            res.status(200).send('Login successful!');
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
});

//------------------client data for dashboard



app.get('/api/client-details/:email', (req, res) => {
    const clientEmail = req.params.email;

    console.log('Received request for client email:', clientEmail);

    // Queries for retrieving data
    const clientQuery = `
        SELECT 
            Client_ID, 
            Client_Name, 
            Client_ContactNumber, 
            Client_Email, 
            Client_Address 
        FROM Clients 
        WHERE Client_Email = ?`;

    const bookingsQuery = `
        SELECT 
            b.Booking_ID, 
            b.Hall_ID, 
            b.Client_ID, 
            b.Company_ID, 
            b.Booking_Date, 
            b.Booking_StartDateTime, 
            b.Booking_EndDateTime, 
            b.Total_Cost, 
            c.Client_Name, 
            h.Hall_name, 
            co.Company_Name,
            CASE 
                WHEN p.Payment_ID IS NOT NULL THEN 'Paid' 
                ELSE 'Unpaid' 
            END AS Payment_Status
        FROM Bookings b
        JOIN Clients c ON b.Client_ID = c.Client_ID
        JOIN Hall h ON b.Hall_ID = h.Hall_ID
        JOIN Company co ON b.Company_ID = co.Company_ID
        LEFT JOIN Payment p ON b.Booking_ID = p.Booking_ID
        WHERE b.Client_ID = ?`;

    const paymentsQuery = `
        SELECT 
            p.Payment_ID, 
            p.Amount, 
            p.Payment_Date, 
            p.Payment_Method 
        FROM Payment p
        WHERE p.Client_ID = ?`;

    // Fetch client details
    db.query(clientQuery, [clientEmail], (err, clientResults) => {
        if (err) {
            console.error('Error fetching client details:', err);
            return res.status(500).json({ error: 'Server error while fetching client details' });
        }

        if (clientResults.length === 0) {
            console.log('Client not found');
            return res.status(404).json({ error: 'Client not found' });
        }

        const client = clientResults[0];
        const clientId = client.Client_ID;

        // Fetch bookings
        db.query(bookingsQuery, [clientId], (err, bookingsResults) => {
            if (err) {
                console.error('Error fetching bookings:', err);
                return res.status(500).json({ error: 'Failed to fetch bookings' });
            }

            // Fetch payments
            db.query(paymentsQuery, [clientId], (err, paymentsResults) => {
                if (err) {
                    console.error('Error fetching payments:', err);
                    return res.status(500).json({ error: 'Failed to fetch payments' });
                }

                // Send response to client
                res.json({
                    client: {
                        id: client.Client_ID,
                        name: client.Client_Name,
                        contact: client.Client_ContactNumber,
                        email: client.Client_Email,
                        address: client.Client_Address,
                    },
                    bookings: bookingsResults.map((booking) => ({
                        id: booking.Booking_ID,
                        date: booking.Booking_Date,
                        startTime: booking.Booking_StartDateTime,
                        endTime: booking.Booking_EndDateTime,
                        totalCost: booking.Total_Cost,
                        eventName: booking.Event_name,
                        eventType: booking.Event_type,
                        hallName: booking.Hall_name,
                        hallLocation: booking.Hall_location,
                        paymentstatus: booking.Payment_Status,
                    })),
                    payments: paymentsResults.map((payment) => ({
                        id: payment.Payment_ID,
                        amount: payment.Amount,
                        date: payment.Payment_Date,
                        method: payment.Payment_Method,
                    })),
                });
            });
        });
    });
});


////////////-----------------------------------------------------------------------------------------------------

app.get('/api/halls', (req, res) => {
    const query = 'SELECT * FROM Hall';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

//---------------------------booking and events 
app.post('/api/bookings', async (req, res) => {
    const {
        hallId: Hall_ID,
        clientId: Client_ID,
        companyId: Company_ID,
        bookingdate: Booking_Date,
        startDateTime: Booking_StartDateTime,
        endDateTime: Booking_EndDateTime,
        totalCost: Total_Cost,
        eventName: Event_name,
        eventDescription: Event_Description,
        eventType: Event_type,
        startDateTime: Event_date_time,
        eventduration: Event_Duration,
        eventOrganizer: Event_OrganizerName,
        eventAttendees: Event_Attenders,
    } = req.body;
    console.log('Received booking request:', req.body);
    console.log("detail",Hall_ID,Client_ID,Company_ID,Booking_StartDateTime,Booking_EndDateTime,Total_Cost,Event_name)
    // Step 1: Validate required fields
    if (
        !Hall_ID ||
        !Client_ID ||
        !Company_ID ||
        !Booking_StartDateTime ||
        !Booking_EndDateTime ||
        !Total_Cost ||
        !Event_name
    ) {
        console.error('Validation failed: Missing required fields');
        return res.status(400).json({ error: 'All required fields must be provided' });
    }

    try {
        // Step 2: Check for conflicting bookings
        // console.log('Checking for conflicting bookings...');
        // const checkQuery = `
        //     SELECT * FROM Bookings 
        //     WHERE Hall_ID = ? 
        //     AND (
        //         (Booking_StartDateTime <= ? AND Booking_EndDateTime >= ?) OR
        //         (Booking_StartDateTime >= ? AND Booking_StartDateTime < ?)
        //     );
        // `;
        // const checkParams = [Hall_ID, Booking_EndDateTime, Booking_StartDateTime, Booking_StartDateTime, Booking_EndDateTime];

        // const [existingBookings] = await db.promise().query(checkQuery, checkParams);

        // if (existingBookings.length > 0) {
        //     console.error('Conflict found: Hall already booked for the selected time');
        //     return res.status(409).json({ error: 'Hall is already booked for the selected time' });
        // }
        // console.log('No conflicting bookings found.');

        // Step 3: Insert into Events table
        console.log('Inserting event...');
        const eventQuery = `
            INSERT INTO Events (
                Hall_ID, Event_name, Event_Description, Event_type, Event_date_time, 
                Event_Duration, Event_OrganizerName, Event_Attenders
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const eventParams = [Hall_ID, Event_name, Event_Description, Event_type, Event_date_time, Event_Duration, Event_OrganizerName, Event_Attenders];

        const [eventResult] = await db.promise().query(eventQuery, eventParams);
        const Event_ID = eventResult.insertId;
        console.log('Event inserted with ID:', Event_ID);

        // Step 4: Insert into Bookings table
        console.log('Inserting booking...');
        const bookingQuery = `
            INSERT INTO Bookings (
                Event_ID, Hall_ID, Client_ID, Booking_Date, 
                Booking_StartDateTime, Booking_EndDateTime, Company_ID, Total_Cost
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const bookingParams = [Event_ID, Hall_ID, Client_ID, Booking_Date, Booking_StartDateTime, Booking_EndDateTime, Company_ID, Total_Cost];

        const [bookingResult] = await db.promise().query(bookingQuery, bookingParams);
        console.log('Booking inserted with ID:', bookingResult.insertId);

        // Step 5: Send success response
        res.status(201).json({ message: 'Hall booked successfully' });
    } catch (err) {
        console.error('Error processing booking:', err);
        res.status(500).json({ error: 'Failed to book hall' });
    }
});



// app.post('/api/bookings', (req, res) => {
//     const { hallId, clientId, startDateTime, endDateTime, companyId, totalCost, eventName, eventDescription, eventType, eventOrganizer, eventAttendees } = req.body;

//     console.log(req.body);
//     console.log("hallid",hallId)
//     // Check for conflicts
//     const checkQuery = `
//         SELECT * 
//         FROM Bookings 
//         WHERE Hall_ID = ?
//           AND (
//               (Booking_StartDateTime < ? AND Booking_EndDateTime > ?)
//               OR (Booking_StartDateTime < ? AND Booking_EndDateTime > ?)
//           );
//     `;
//     db.query(checkQuery, [hallId, endDateTime, startDateTime, startDateTime, endDateTime], (err, results) => {
//         if (err) return res.status(500).json({ error: 'Database error' });
//         if (results.length > 0) return res.status(409).json({ error: 'Hall already booked for the selected time' });

//         // Insert booking
//         const bookingQuery = `
//             INSERT INTO Bookings 
//             (Hall_ID, Client_ID, Booking_Date, Booking_StartDateTime, Booking_EndDateTime, Company_ID, Total_Cost)
//             VALUES (?, ?, NOW(), ?, ?, ?, ?);
//         `;
//         db.query(bookingQuery, [hallId, clientId, startDateTime, endDateTime, companyId, totalCost], (err, result) => {
//             if (err) return res.status(500).json({ error: 'Database error' });

//             // Insert event
//             const eventQuery = `
//                 INSERT INTO Events 
//                 (Hall_ID, Event_name, Event_Description, Event_type, Event_date_time, Event_Duration, Event_OrganizerName, Event_Attenders)
//                 VALUES (?, ?, ?, ?, ?, TIMEDIFF(?, ?), ?, ?);
//             `;
//             db.query(eventQuery, [hallId, eventName, eventDescription, eventType, startDateTime, endDateTime, eventOrganizer, eventAttendees], (err, eventResult) => {
//                 if (err) return res.status(500).json({ error: 'Database error' });

//                 // Update booking with event ID
//                 const updateBooking = `
//                     UPDATE Bookings 
//                     SET Event_ID = ? 
//                     WHERE Booking_ID = ?;
//                 `;
//                 db.query(updateBooking, [eventResult.insertId, result.insertId], (err) => {
//                     if (err) return res.status(500).json({ error: 'Database error' });
//                     res.json({ message: 'Booking and event created successfully' });
//                 });
//             });
//         });
//     });
// });

//---------------------------------------------testing booking and events
//return all booking and events
app.get('/api/bookingsdeatil', (req, res) => {
    const query = `
        SELECT 
            b.Booking_ID, 
            b.Hall_ID, 
            b.Client_ID, 
            b.Company_ID, 
            b.Booking_Date, 
            b.Booking_StartDateTime, 
            b.Booking_EndDateTime, 
            b.Total_Cost, 
            c.Client_Name, 
            h.Hall_name, 
            co.Company_Name,
            CASE 
                WHEN p.Payment_ID IS NOT NULL THEN 'Paid' 
                ELSE 'Unpaid' 
            END AS Payment_Status
        FROM Bookings b
        JOIN Clients c ON b.Client_ID = c.Client_ID
        JOIN Hall h ON b.Hall_ID = h.Hall_ID
        JOIN Company co ON b.Company_ID = co.Company_ID
        LEFT JOIN Payment p ON b.Booking_ID = p.Booking_ID;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('Booking_Date from DB:', results);
        res.json(results);
    });
});

app.get('/api/events', (req, res) => {
    const query = `
        SELECT 
            e.Event_ID, 
            e.Hall_ID, 
            e.Event_name, 
            e.Event_Description, 
            e.Event_type, 
            e.Event_date_time, 
            e.Event_Duration, 
            e.Event_OrganizerName, 
            e.Event_Attenders, 
            h.Hall_name
        FROM Events e
        JOIN Hall h ON e.Hall_ID = h.Hall_ID;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

//---------make payment


app.post('/api/makepayment', (req, res) => {
    const {
        clientId: Client_ID,
        Bookingid: Booking_ID,
        bookingcost: Amount,
        paymentmethod: Payment_Method,
    } = req.body;

    // Validate required fields first
    if (!Client_ID || !Booking_ID || !Amount || !Payment_Method) {
        console.log("Missing required fields.");
        return res.status(400).json({ message: 'All fields are required.' });
    }

    console.log(req.body);

    // Query to check if payment already exists
    const checkPaymentQuery = `SELECT * FROM Payment WHERE Booking_ID = ?`;

    db.query(checkPaymentQuery, [Booking_ID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error during payment check.', error: err.message });
        }

        if (results.length > 0) {
            // Payment already exists for the given Booking_ID
            return res.status(400).json({ message: 'Payment already completed for this booking.' });
        }

        // Insert payment if no existing record is found
        const sqlquery = `INSERT INTO Payment (Booking_ID, Client_ID, Amount, Payment_Date, Payment_Method) 
                          VALUES (?, ?, ?, CURDATE(), ?)`;

        db.query(sqlquery, [Booking_ID, Client_ID, Amount, Payment_Method], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error during payment insertion.', error: err.message });
            }

            res.status(201).json({
                message: 'Payment created successfully!',
                paymentId: result.insertId, // Optional: return the new Payment ID
            });
        });
    });
});
