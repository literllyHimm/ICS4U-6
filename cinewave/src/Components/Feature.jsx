import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Feature.css';

const Feature = () => {
  const [movies, setMovies] = useState([]);
  
  const NUM_RANDOM_MOVIES = 8;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const API_KEY = "9e9ae8b4151b5a20e5c95911ff07c4e4";
    const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";

    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY },
      });
      
      const randomMovies = getRandomMovies(response.data.results);
      setMovies(randomMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Function to get random movies
  const getRandomMovies = (moviesArray) => {
    const randomMovies = [];
    const selectedIndexes = new Set();

    while (randomMovies.length < NUM_RANDOM_MOVIES && selectedIndexes.size < moviesArray.length) {
      const randomIndex = Math.floor(Math.random() * moviesArray.length);
      if (!selectedIndexes.has(randomIndex)) {
        randomMovies.push(moviesArray[randomIndex]);
        selectedIndexes.add(randomIndex);
      }
    }

    return randomMovies;
  };

  return (
    <div className="feature-container">
      <h2>Featured Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movies/details/${movie.id}`} key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-image"
            />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feature;
