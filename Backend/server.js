// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');  // Import database connection

const app = express();
app.use(cors());
app.use(express.json());

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

//------------------- get the comapany halls by id
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
            b.Booking_Date, 
            b.Booking_StartDateTime, 
            b.Booking_EndDateTime, 
            b.Total_Cost, 
            e.Event_name, 
            e.Event_type, 
            h.Hall_name, 
            h.Hall_location 
        FROM Bookings b
        JOIN Events e ON b.Event_ID = e.Event_ID
        JOIN Hall h ON b.Hall_ID = h.Hall_ID
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


// app.get('/api/client-details/:email', (req, res) => {
//     const Client_Email = req.params.email;
//     console.log('Received request for email:', Client_Email);

//     const nameidquery = `SELECT Client_ID, Client_Name, Client_Email, Client_ContactNumber 
//                          FROM Clients WHERE Client_Email = ?`;
//     const bookingsQuery = `SELECT Booking_ID, Event_name, Hall_name, Booking_Date, Status 
//                            FROM Bookings WHERE Client_ID = ?`;
//     const paymentsQuery = `SELECT Payment_ID, Amount, Payment_Date, Payment_Method 
//                            FROM Payment WHERE Client_ID = ?`;

//     // Fetch client information
//     db.query(nameidquery, [Client_Email], (err, result) => {
//         if (err) {
//             console.error('Error fetching client details:', err);
//             return res.status(500).json({ error: 'Server error while fetching client details' });
//         }

//         if (result.length === 0) {
//             console.log('Client not found');
//             return res.status(404).json({ error: 'Client not found' });
//         }

//         const Client_ID = result[0].Client_ID;
//         console.log('Client ID:', Client_ID);

//         // Fetch bookings
//         db.query(bookingsQuery, [Client_ID], (err, bookingsResults) => {
//             if (err) {
//                 console.error('Error fetching bookings:', err);
//                 return res.status(500).json({ error: 'Failed to fetch bookings' });
//             }

//             // Fetch payments
//             db.query(paymentsQuery, [Client_ID], (err, paymentsResults) => {
//                 if (err) {
//                     console.error('Error fetching payments:', err);
//                     return res.status(500).json({ error: 'Failed to fetch payments' });
//                 }

//                 // Send response
//                 res.json({
//                     client: {
//                         id: result[0].Client_ID,
//                         name: result[0].Client_Name,
//                         email: result[0].Client_Email,
//                         contact: result[0].Client_ContactNumber,
//                     },
//                     bookings: bookingsResults.length > 0
//                         ? bookingsResults.map((booking) => ({
//                               id: booking.Booking_ID,
//                               eventName: booking.Event_name,
//                               hallName: booking.Hall_name,
//                               date: booking.Booking_Date,
//                               status: booking.Status,
//                           }))
//                         : [],
//                     payments: paymentsResults.length > 0
//                         ? paymentsResults.map((payment) => ({
//                               id: payment.Payment_ID,
//                               amount: payment.Amount,
//                               date: payment.Payment_Date,
//                               method: payment.Payment_Method,
//                           }))
//                         : [],
//                 });
//             });
//         });
//     });
// });

// app.get('/api/client-details/:email',(req,res)=>{
//     const Client_Email= req.params.email;
//     console.log('Received request for email:', Client_Email);
//     //first fetch the company name and id 
//     //const nameidquery='select * from Clients where Client_Email=?';
//     const nameidquery = `SELECT Client_ID, Client_Name, Client_Email, Client_ContactNumber FROM Clients WHERE Client_Email = ?`;
//     const bookingsQuery = `SELECT Booking_ID, Event_name, Hall_name, Booking_Date, Status FROM Bookings WHERE Client_ID = ?`;
//     const paymentsQuery = `SELECT Payment_ID, Amount, Payment_Date, Payment_Method FROM Payment WHERE Client_ID = ?`;

//     db.query(nameidquery,[Client_Email],(err,clientResults)=>{
//         if(err){
//             console.error('Error executing query:',err);
//             return res.status(500).json({error: 'server error'});
//         }
//         console.log('Query Result:', clientResults);
//         if(clientResults.length>0){
//             Client_ID=clientResults[0].Client_ID;
//             console.log("i ma cliendid",Client_ID);
//             //------------------
//             db.query(bookingsQuery, [Client_ID], (err, bookingsResults) => {
//                 if (err) return res.status(500).send(err);
    
//                 db.query(paymentsQuery, [Client_ID], (err, paymentsResults) => {
//                     if (err) return res.status(500).send(err);
    
//                     res.json({
//                         client: {
//                             id: clientResults[0].Client_ID,
//                             name: clientResults[0].Client_Name,
//                             email: clientResults[0].Client_Email,
//                             contact: clientResults[0].Client_ContactNumber,
//                         },
//                         bookings: bookingsResults.map((booking) => ({
//                             id: booking.Booking_ID,
//                             eventName: booking.Event_name,
//                             hallName: booking.Hall_name,
//                             date: booking.Booking_Date,
//                             status: booking.Status,
//                         })),
//                         payments: paymentsResults.map((payment) => ({
//                             id: payment.Payment_ID,
//                             amount: payment.Amount,
//                             date: payment.Payment_Date,
//                             method: payment.Payment_Method,
//                         })),
//                     });
//                 });
//             });
//             ///-------------------
//             console.log('Query Result:', clientResults);
//         }
//         else{
//             return res.status(404).json({error: 'company not found'});
//             console.log("not found");
//         }
//     })
// })