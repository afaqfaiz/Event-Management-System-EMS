// React Component
import React from "react";
import {useNavigate} from 'react-router-dom'
import "../main-css/main.css";

function FrontPage() {
  const navigate = useNavigate();
  const handlecompanylogin=()=>{
    navigate('/companylogin')
  }
  const handleclientlogin=()=>{
    navigate('/clientlogin')
  }
  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Welcome</h1>

        <div className="button-group">
          <button className="btn login" onClick={handlecompanylogin}>Company Login</button>
          <p className="link-text">
            Don&apos;t have a company account? <a href="/company/signup">Sign up</a>
          </p>
        </div>

        <div className="button-group">
          <button className="btn login" onClick={handleclientlogin}>Client Login</button>
          <p className="link-text">
            Don&apos;t have a client account? <a href="/client/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;

