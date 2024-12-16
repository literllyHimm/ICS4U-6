import React, { useState, useEffect } from "react"; 
import { useUserContext } from "../context/UserContext"; 
import "../styles/SettingsView.css"; 

const SettingsView = () => {
  const { user, setUser } = useUserContext(); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    preferredGenre: [],  
  });
  const [message, setMessage] = useState(""); 

  const allGenres = [
    "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Fantasy", "Romance", "Thriller", "Mystery", "Documentary"
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        preferredGenre: user.preferredGenre || [],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "preferredGenre") {   
      setFormData((prevData) => {
        const updatedGenres = prevData.preferredGenre.includes(value)
          ? prevData.preferredGenre.filter((genre) => genre !== value) 
          : [...prevData.preferredGenre, value];  
        return { ...prevData, preferredGenre: updatedGenres };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();   
    setUser((prevUser) => ({
      ...prevUser,
      ...formData,
    }));

    setMessage("Your information has been updated successfully!");
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
            <div className="genre-selection">
              {allGenres.map((genre) => (
                <label key={genre}>
                  <input
                    type="checkbox"
                    name="preferredGenre"
                    value={genre}
                    checked={formData.preferredGenre.includes(genre)}
                    onChange={handleChange}
                  />
                  {genre}
                </label>
              ))}
            </div>
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
