// React Component
import React from "react";
import "../main-css/main.css";

function FrontPage() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Welcome</h1>

        <div className="button-group">
          <button className="btn login">Company Login</button>
          <p className="link-text">
            Don&apos;t have a company account? <a href="/company-signup">Sign up</a>
          </p>
        </div>

        <div className="button-group">
          <button className="btn login">Client Login</button>
          <p className="link-text">
            Don&apos;t have a client account? <a href="/client-signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;

