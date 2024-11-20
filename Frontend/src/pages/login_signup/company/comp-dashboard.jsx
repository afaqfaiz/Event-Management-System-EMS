import { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterHall from './comp_hall_register';
import HallList from './comp_halls_list';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const CompanyDashboard = () => {
    const [company, setCompany] = useState(null); // State for company details
    const [halls, setHalls] = useState([]); // State for halls

    useEffect(() => {
        // Check if the user is logged in

            // Fetch company and halls data
            const fetchData = async () => {
                try {
                    const Company_Email = localStorage.getItem('companyEmail');
                    
                    // Fetch company details
                    const companyResponse = await axios.get(`http://localhost:5000/api/company/data/${ Company_Email}`);
                    setCompany(companyResponse.data);
                    localStorage.setItem('companyid',companyResponse.data.Company_ID);
                    // Fetch halls associated with the company
                    const hallsResponse = await axios.get(`http://localhost:5000/api/company/halls/${companyResponse.data.Company_ID}`);
                     setHalls(hallsResponse.data);
                } catch (error) {
                    console.error('Error fetching company or halls data:', error);
                }
            };

            fetchData();
        },[Navigate]);

    if (!company) {
        return <p>Loading company details...</p>; // Show loading state until data is fetched
    }

    return (
        <div>
            <h1>Welcome, {company.Company_Name}</h1>
            <Navbar />
            <p>Email: {company.Company_Email}</p>
            <p>Address: {company.Company_Address}</p>
            <p>Contact: {company.Company_Contact}</p>

            <h2>Your Halls</h2>
            <HallList/>
            <RegisterHall />            
        </div>
    );
};

export default CompanyDashboard;
