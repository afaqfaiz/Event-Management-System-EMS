import React from 'react';
import '../client-css/Navbar.css';
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ name, onEdit, onLogout }) => {
  const { logout } = useAuthStore();
  const user = useAuthStore();
  const clientname=user.user.name;
  console.log(user.user);
  const navigate = useNavigate();
   onLogout =()=>{
    logout();
    alert('Logged out successfully!');
    navigate('/')
  }
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src="profile-pic.jpg" alt="Profile" className="profile-img" />
        <span className="profile-name">{clientname}</span>
      </div>
      <div className="navbar-right">
        <button className="btn edit-btn" onClick={onEdit}>Edit</button>
        <button className="btn logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
