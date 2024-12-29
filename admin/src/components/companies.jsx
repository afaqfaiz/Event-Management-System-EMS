import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../admin.css/companies.css';

const CompaniesList = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch companies from API on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/company/getallcompanies');
        const data = await response.json();

        if (response.ok) {
          setCompanies(data);
        } else {
          setError('Failed to fetch companies');
        }
      } catch (err) {
        setError('Failed to connect to the server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on search query
  const filteredCompanies = companies.filter((company) =>
    company.Company_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewHalls = (companyId, companyName) => {
    navigate('/halls', {
      state: { companyId, companyName },
    });
  };
  const handleDeleteCompany = async (companyId,companyname)=>{
    const confirm = window.confirm(`Are you sure you want to delete "${companyname}" company?`);
    if (confirm) {

    }

  }

  const handleViewBookings = (companyId, companyName) => {
    navigate('/bookings', {
      state: { companyId, companyName },
    });
  };

  return (
    <div className="companies-list">
      <h2>Registered Companies</h2>

      {loading ? (
        <p>Loading companies...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : filteredCompanies.length > 0 ? (
        filteredCompanies.map((company) => (
          <div key={company.Company_ID} className="company-card">
            <h3>Name: {company.Company_Name}</h3>
            <p>Email: {company.Company_Email}</p>
            <p>Contact: {company.Company_Contact}</p>
            <p>Address: {company.Company_Address}</p>
            <p>Owner: {company.Company_Owner}</p>
            <div className="actions">
              <button
                onClick={() => handleViewHalls(company.Company_ID, company.Company_Name)}
              >
                See Halls
              </button>
              <button
                onClick={() => handleViewBookings(company.Company_ID, company.Company_Name)}
              >
                See Bookings
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteCompany(company.Company_ID,company.Company_Name)}
              >
                Delete Company
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
};

export default CompaniesList;
