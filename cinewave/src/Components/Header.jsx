// src/Components/Header.jsx
import React, { useContext } from 'react'; // Use useContext here
import { UserContext } from '../context/UserContext'; // Import UserContext
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Make sure you're using Header.css for the styles

const Header = () => {
  const { user, logout } = useContext(UserContext); // Use the UserContext directly

  return (
    <div className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/genres">Genres</Link> {/* Add Genres link */}
      </nav>
      
      {user ? (
        <div className="user-info">
          <p>Welcome, {user.firstName}!</p>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      ) : (
        <div className="guest-info">
          <p>Please log in to enjoy all features.</p>
        </div>
      )}
    </div>
  );
};

export default Header;
