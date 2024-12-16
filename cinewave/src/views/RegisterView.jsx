import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/RegisterView.css';

const RegisterView = () => {
  const { setUser } = useUserContext(); 
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedGenres: [],  
  });

  const [errors, setErrors] = useState({});

  const genres = [
    { id: 28, name: 'Action' },
    { id: 80, name: 'Crime' },
    { id: 27, name: 'Horror' },
    { id: 53, name: 'Thriller' },
    { id: 12, name: 'Adventure' },
    { id: 10751, name: 'Family' },
    { id: 10402, name: 'Music' },
    { id: 10752, name: 'War' },
    { id: 16, name: 'Animation' },
    { id: 14, name: 'Fantasy' },
    { id: 9648, name: 'Mystery' },
    { id: 37, name: 'Western' },
    { id: 35, name: 'Comedy' },
    { id: 36, name: 'History' },
    { id: 878, name: 'Science Fiction' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => {
        const updatedGenres = checked
          ? [...prevData.selectedGenres, value]
          : prevData.selectedGenres.filter((genre) => genre !== value);
        return { ...prevData, selectedGenres: updatedGenres };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword, selectedGenres } = formData;
    let formErrors = {};
    let isValid = true;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      formErrors.required = 'All fields are required.';
      isValid = false;
    }

    if (password !== confirmPassword) {
      formErrors.passwordMatch = 'Passwords do not match.';
      isValid = false;
    }

    if (selectedGenres.length < 10) {
      formErrors.genres = 'You must select at least 10 genres.';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUser(formData); 
      alert('Registration successful!');
      navigate('/login'); 
    } else {
      alert('Please fix the errors before submitting.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Select Genres (at least 10)</label>
          <div>
            {genres.map((genre) => (
              <div key={genre.id}>
                <input
                  type="checkbox"
                  name="selectedGenres"
                  value={genre.name}
                  onChange={handleChange}
                  checked={formData.selectedGenres.includes(genre.name)}
                />
                <label>{genre.name}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">Register</button>
      </form>

      {errors.required && <p>{errors.required}</p>}
      {errors.passwordMatch && <p>{errors.passwordMatch}</p>}
      {errors.genres && <p>{errors.genres}</p>}
    </div>
  );
};

export default RegisterView;
