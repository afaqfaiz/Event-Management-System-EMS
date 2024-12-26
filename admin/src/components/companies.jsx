import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../admin.css/companies.css';

const companiesData = [
  { id: 1, name: 'Company A', email: 'contact@companya.com' },
  { id: 2, name: 'Company B', email: 'info@companyb.com' },
  { id: 3, name: 'Company C', email: 'hello@companyc.com' },
];

const CompaniesList = ({ searchQuery }) => {
  const navigate = useNavigate();

  const filteredCompanies = companiesData.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewHalls = (companyId, companyName) => {
    navigate('/halls', {
      state: { companyId, companyName },
    });
  };

  const handleViewBookings = (companyId, companyName) => {
    navigate('/bookings', {
      state: { companyId, companyName },
    });
  };

  return (
    <div className="companies-list">
      <h2>Registered Companies</h2>
      {filteredCompanies.length > 0 ? (
        filteredCompanies.map((company) => (
          <div key={company.id} className="company-card">
            <h3>{company.name}</h3>
            <p>{company.email}</p>
            <div className="actions">
              <button
                onClick={() => handleViewHalls(company.id, company.name)}
              >
                See Halls
              </button>
              <button
                onClick={() => handleViewBookings(company.id, company.name)}
              >
                See Bookings
              </button>
              <button
                className="delete-btn"
                onClick={() => alert(`Delete ${company.name}`)}
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
