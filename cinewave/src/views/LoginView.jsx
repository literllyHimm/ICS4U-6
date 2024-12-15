import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext'; // Import UserContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../styles/LoginView.css';

const LoginView = () => {
  const { user } = useUserContext(); // Access the registered user data from context
  const navigate = useNavigate(); // Initialize navigate for redirection

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // To handle login errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if entered credentials match the registered user data
    if (user && formData.email === user.email && formData.password === user.password) {
      alert('Login successful!');
      navigate('/home'); // Redirect to the homepage or dashboard
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-view-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="/register">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
