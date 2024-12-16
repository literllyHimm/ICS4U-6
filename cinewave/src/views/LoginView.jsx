import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/LoginView.css';

const LoginView = () => {
  const { user } = useUserContext(); 
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && formData.email === user.email && formData.password === user.password) {
      alert('Login successful!');
      navigate('/home'); 
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
