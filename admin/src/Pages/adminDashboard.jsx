import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CompaniesList from '../components/companies';
import '../admin.css/dashboard.css';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('companies');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar setActiveSection={setActiveSection} />
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <Navbar setSearchQuery={setSearchQuery} />
        </div>

        {/* Dynamic Content */}
        <div className="content">
          {activeSection === 'companies' && <CompaniesList searchQuery={searchQuery} />}
          {/* Add additional sections here */}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
