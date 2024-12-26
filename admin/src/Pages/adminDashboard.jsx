import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CompaniesList from '../components/companies';
import '../admin.css/dashboard.css'

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('companies');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="admin-panel">
      <Sidebar setActiveSection={setActiveSection} />
      <main className="main-content">
        <Navbar setSearchQuery={setSearchQuery} />
        {activeSection === 'companies' && <CompaniesList searchQuery={searchQuery} />}
        {/* Add additional sections as needed */}
      </main>
    </div>
  );
};

export default AdminPanel;
