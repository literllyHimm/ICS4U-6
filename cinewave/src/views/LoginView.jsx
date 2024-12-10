// src/views/LoginView.jsx
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext'; // Correctly import UserContext
import '../styles/LoginView.css';

const LoginView = () => {
  const { user, login } = useContext(UserContext); // Use context directly
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    // Call the login function to set the user in context
    login(userData);
  };

  return (
    <div>
      <h1>Login</h1>
      {user ? (
        <p>Welcome back, {user.email}</p>
      ) : (
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
      )}
    </div>
  );
};

export default LoginView;
