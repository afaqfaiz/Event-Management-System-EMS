import React from 'react';
import '../admin.css/Navbar.css';

const Navbar = ({ setSearchQuery, adminName = 'John Doe', adminEmail = 'admin@example.com' }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="navbar">
      <div className="admin-info">
        <h2 className="welcome-text">Welcome Admin</h2>
        <p className="admin-name">{adminName}</p>
        <p className="admin-email">{adminEmail}</p>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search companies..."
          className="search-bar"
          onChange={handleSearch}
        />
      </div>
    </header>
  );
};

export default Navbar;
