import React from 'react';
import '../admin.css/Navbar.css';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setSearchQuery}) => {
  const navigate = useNavigate();
  const {logout}=useAuthStore();
  const user = useAuthStore();
  const admin= user.user;
console.log(user);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
    navigate('/login')
  };
  return (
    <header className="navbar">
      <div className="admin-info">
        <h2 className="welcome-text">Welcome Admin</h2>
        <p className="admin-name">{admin.name}</p>
        <p className="admin-email">{admin.email}</p>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search companies..."
          className="search-bar"
          onChange={handleSearch}
        />
      </div>
      <div className="navbar-right">
        <button
          className="btn logout-btn"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
        </div>
    </header>
  );
};

export default Navbar;
