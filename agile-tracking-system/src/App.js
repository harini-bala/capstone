import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import AdminSignup from './admin/AdminSignup';
import AdminPage from './admin/AdminPage';
import ParentComponent from './user/UserDashboard';
import UserLogin from './user/UserLogin';
import UserSignup from './user/UserSignup';
import TestDashboard from './TestDashboard'; // Import TestDashboard

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-projects" element={<AdminPage />} />
        <Route path="/test-dashboard" element={<TestDashboard />} /> {/* Add this route */}
        <Route path="/test-dashboard/:taskId" element={<TestDashboard />} />{/*Add this route, for the individual task page*/}
        <Route path="/user-dashboard" element={<ParentComponent />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
      </Routes>
    </Router>
  );
}

export default App;