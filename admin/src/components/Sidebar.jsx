import React from 'react';
import '../admin.css/Sidebar.css'
const Sidebar = ({ setActiveSection }) => {
  return (
    <aside className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li onClick={() => setActiveSection('companies')}>Companies</li>
        {/* Add more sections if needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
