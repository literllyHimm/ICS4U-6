// src/views/SettingsView.jsx
import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext'; // Import the custom hook for UserContext
import '../styles/SettingsView.css'; // Import the CSS for the settings view

const SettingsView = () => {
  const { user, setUser } = useUserContext(); // Get the user and setUser functions from context
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    preferredGenre: ''
  });
  const [message, setMessage] = useState(''); // To show success or error messages

  // Update the form data with current user data when the component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email, // Email is displayed but not editable
        preferredGenre: user.preferredGenre || '' // Make sure there's a preferred genre if available
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the user context with the new data
    setUser({ ...user, ...formData });
    setMessage('Your information has been updated successfully!'); // Show success message
  };

  return (
    <div className="settings-view-container">
      <h2>Settings</h2>

      {user ? (
        <div className="settings-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
              />
            </div>

            <div>
              <label htmlFor="preferredGenre">Preferred Genre</label>
              <input
                type="text"
                name="preferredGenre"
                value={formData.preferredGenre}
                onChange={handleChange}
                placeholder="Enter preferred genre"
              />
            </div>

            <button type="submit">Save Changes</button>
          </form>

          {/* Display success or error messages */}
          {message && <p className="success-message">{message}</p>}
        </div>
      ) : (
        <p>Please log in to update your settings.</p>
      )}
    </div>
  );
};

export default SettingsView;
