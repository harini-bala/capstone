import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar" style={{ 
      backgroundColor: "#1976d2",
      padding: "1rem",
      color: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ margin: 0 }}>Agile Tracker</h1>
      <div>
        <Link to="/" style={{ 
          color: "white", 
          textDecoration: "none", 
          margin: "0 1rem",
          padding: "0.5rem",
          borderRadius: "4px",
          transition: "background-color 0.3s"
        }}>Home</Link>
        <Link to="/user-login" style={{ 
          color: "white", 
          textDecoration: "none", 
          margin: "0 1rem",
          padding: "0.5rem",
          borderRadius: "4px",
          transition: "background-color 0.3s"
        }}>User Login</Link>
        <Link to="/admin-login" style={{ 
          color: "white", 
          textDecoration: "none", 
          margin: "0 1rem",
          padding: "0.5rem",
          borderRadius: "4px",
          transition: "background-color 0.3s"
        }}>Admin Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;