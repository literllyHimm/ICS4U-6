  import React from 'react';
  import { Link } from 'react-router-dom';
  import { useUserContext } from '../context/UserContext';  
  import { useCart } from '../context/CartContext'; 
  import '../styles/Header.css';  

  const Header = () => {
    const { user, setUser } = useUserContext(); 
    const { cart } = useCart(); 
    const handleLogout = () => {
      setUser(null);  
    };

    return (
      <div className="header-container">
        <div className="logo">
          <h1>CineWave</h1>
        </div>
        
        <div className="nav-links">
          {/* Show login/register if no user is logged in */}
          {!user ? (
            <div className="auth-buttons">
              <Link to="/login" className="auth-button">Login</Link>
              <Link to="/register" className="auth-button">Register</Link>
            </div>
          ) : (
            <div className="user-info">
              <span className="welcome-message">Hello {user.firstName}!</span>
              {/* Show these buttons when logged in */}
              <Link to="/" className="nav-button">Home</Link>
              <Link to="/genres" className="nav-button">Genres</Link>
              <Link to="/cart" className="nav-button">
                Cart ({cart.length})
              </Link>
              <Link to="/settings" className="nav-button">
                Settings
              </Link>
              <button onClick={handleLogout} className="nav-button logout-button">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default Header;
