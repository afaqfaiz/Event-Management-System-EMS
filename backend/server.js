const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./db');
const authRoutes = require('./companyroutes/authRoutes');
const hallRoutes = require('./companyroutes/HallRoutes');
const clientAuth = require('./clientroutes/clientauth');
const clientRoutes = require('./clientroutes/client');
const createclientbooking =require('./bookingRoute/clientbooking');
const processPayment= require('./paymentRoutes/payment');
const companybookingsRoute = require('./bookingRoute/companybooking');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
// Routes
app.use('/api/company', authRoutes);

app.use('/api/hall', hallRoutes);

app.use('/api/client/auth', clientAuth);

app.use('/api/client/hall',clientRoutes);

app.use('/api/client/bookings',createclientbooking);

app.use('/api/payment',processPayment);


app.use('/api/company/bookings', companybookingsRoute);

// Connect to Database



// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
