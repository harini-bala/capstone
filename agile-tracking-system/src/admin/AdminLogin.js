import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './admin-styles.css'; // Import the CSS


const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Get stored credentials from local storage
    const storedEmail = localStorage.getItem("adminEmail");
    const storedPassword = localStorage.getItem("adminPassword");

    // Check if entered credentials match stored credentials
    if (email === storedEmail && password === storedPassword) {
      alert("Login successful!");
      navigate("/admin-projects"); // Redirect to Admin Dashboard
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/admin-signup")}>Sign Up</button>
      </p>
    </div>
  );
};

export default AdminLogin;
