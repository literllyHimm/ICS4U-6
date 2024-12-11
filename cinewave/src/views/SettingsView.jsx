import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext"; // Import the custom hook for UserContext
import "../styles/SettingsView.css"; // Import the CSS for the settings view

const SettingsView = () => {
  const { user, setUser } = useUserContext(); // Access user data and update function from context
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    preferredGenre: "",
  });
  const [message, setMessage] = useState(""); // For displaying success messages

  // Populate formData when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        preferredGenre: user.preferredGenre || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the UserContext with new data
    setUser((prevUser) => ({
      ...prevUser,
      ...formData,
    }));

    // Provide user feedback
    setMessage("Your information has been updated successfully!");

    // Optionally, clear the success message after a delay
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="settings-view-container">
      <h2>Settings</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="preferredGenre">Preferred Genre</label>
            <input
              type="text"
              id="preferredGenre"
              name="preferredGenre"
              value={formData.preferredGenre}
              onChange={handleChange}
              placeholder="Enter preferred genre"
            />
          </div>

          <button type="submit" className="save-button">
            Save Changes
          </button>

          {message && <p className="success-message">{message}</p>}
        </form>
      ) : (
        <p className="error-message">Please log in to update your settings.</p>
      )}
    </div>
  );
};

export default SettingsView;
