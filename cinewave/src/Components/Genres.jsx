import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Genres = ({ genresList }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMoviesByGenre = async (genreId) => {
    const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
    const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

    try {
      setIsLoading(true);
      setError('');
      const response = await axios.get(BASE_URL, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h2>Browse by Genre</h2>
      <div style={styles.buttonContainer}>
        {genresList.map((genre) => (
          <button
            key={genre.id}
            onClick={() => fetchMoviesByGenre(genre.id)}
            style={styles.button}
          >
            {genre.genre}
          </button>
        ))}
      </div>
      <div>
        {isLoading && <p>Loading movies...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!isLoading && movies.length > 0 && (
          <div style={styles.movieContainer}>
            {movies.map((movie) => (
              <div key={movie.id} style={styles.movieCard}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={styles.movieImage}
                />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

Genres.propTypes = {
  genresList: PropTypes.arrayOf(
    PropTypes.shape({
      genre: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const styles = {
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  movieContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  movieCard: {
    textAlign: 'center',
    width: '200px',
  },
  movieImage: {
    width: '100%',
    borderRadius: '10px',
  },
};

export default Genres;
