import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Frontpage from './pages/login_signup/frontpage';
import CompanyPage from './pages/login_signup/company/comp-front';
import LoginPage from './pages/login_signup/company/comp-login';
import RegisterCompanyPage from './pages/login_signup/company/comp-register';
import Comppage from './pages/login_signup/company/comp-page';

import ClientPage from './pages/login_signup/client/client-front';
import ClientLoginPage from './pages/login_signup/client/client-login';
import RegisterClientPage from './pages/login_signup/client/client-register';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/companyfront" element={<CompanyPage />} />
        <Route path="/complogin" element={<LoginPage />} />
        <Route path="/compregister" element={<RegisterCompanyPage />} />
        <Route path="/clientfront" element={<ClientPage />} />
        <Route path="/clientlogin" element={<ClientLoginPage />} />
        <Route path="/clientregister" element={<RegisterClientPage />} />
        <Route path="/companypagedetail" element={<Comppage />} />
      </Routes>
    </Router>
  );
}

export default App;










// // frontend/src/CompanyList.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//     const [companies, setCompanies] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/companies1')
//             .then(response => setCompanies(response.data))
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);

//     return (
//         <div>
//             <h2>Companies</h2>
//             <ul>
//                 {companies.map(company => (
//                     <li key={company.CompanyID}>{company.Company_Name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;
