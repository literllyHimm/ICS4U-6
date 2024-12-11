import React, { useState } from 'react';
import '../styles/LoginView.css';

const LoginView = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Login form submitted');
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
