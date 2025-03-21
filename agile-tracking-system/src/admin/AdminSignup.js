import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './admin-styles.css'; // Import the CSS


const AdminSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Store credentials in local storage
    localStorage.setItem("adminEmail", email);
    localStorage.setItem("adminPassword", password);

    alert("Signup successful! Please log in.");
    navigate("/admin-login"); // Redirect to Admin Login page
  };

  return (
    <div className="signup-container">
      <h2>Admin Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/admin-login")}>Login</button>
      </p>
    </div>
  );
};

export default AdminSignup;
