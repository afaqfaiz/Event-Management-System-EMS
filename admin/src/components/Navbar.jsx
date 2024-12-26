import React from 'react';
import '../admin.css/Navbar.css'
const Navbar = ({ setSearchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="navbar">
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Search companies..."
        className="search-bar"
        onChange={handleSearch}
      />
    </header>
  );
};

export default Navbar;
