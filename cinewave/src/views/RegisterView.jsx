import React, { useState, useEffect } from 'react'; 
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
  const [genres, setGenres] = useState([]);  // Initialize genres state

  useEffect(() => {
    // Fetch genres from the API
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9e9ae8b4151b5a20e5c95911ff07c4e4');
        const data = await response.json();
        setGenres(data.genres);  // Set the fetched genres
      } catch (error) {
        console.error('Error fetching genres:', error);
        setErrors((prev) => ({ ...prev, genres: 'Failed to load genres.' }));
      }
    };

    fetchGenres();
  }, []);

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

    // Validate required fields
    if (!firstName) formErrors.firstName = 'First name is required.';
    if (!lastName) formErrors.lastName = 'Last name is required.';
    if (!email) formErrors.email = 'Email is required.';
    if (!password) formErrors.password = 'Password is required.';
    if (!confirmPassword) formErrors.confirmPassword = 'Confirm password is required.';
    if (password !== confirmPassword) formErrors.passwordMatch = 'Passwords do not match.';
    if (selectedGenres.length < 10) formErrors.genres = 'You must select at least 10 genres.';

    // Check if there are any errors
    if (Object.keys(formErrors).length > 0) {
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
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          {errors.passwordMatch && <p className="error">{errors.passwordMatch}</p>}
        </div>
        <div>
          <label>Select Genres (at least 10)</label>
          <div>
            {genres.length > 0 ? (
              genres.map((genre) => (
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
              ))
            ) : (
              <p>Loading genres...</p>
            )}
          </div>
          {errors.genres && <p className="error">{errors.genres}</p>}
        </div>

        <button type="submit">Register</button>
      </form>

      {errors.required && <p>{errors.required}</p>}
    </div>
  );
};

export default RegisterView;
