import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUserContext } from '../context/UserContext';
import '../styles/MoviesView.css';

const MoviesView = () => {
  const { user } = useUserContext(); 
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allGenres, setAllGenres] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const genreId = new URLSearchParams(location.search).get('genre');  
  const { cart, addToCart, removeFromCart } = useCart();

  
  const fetchGenres = async () => {
    const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
    const BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list';

    try {
      const response = await axios.get(BASE_URL, { params: { api_key: API_KEY } });
      setAllGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenres(); 
  }, []);

  
  useEffect(() => {
    if (genreId) {
      fetchMovies(genreId, currentPage); 
    } else if (user?.selectedGenres?.length > 0) {
      const genreIds = user.selectedGenres
        .map((selectedGenre) => {
          const genre = allGenres.find((g) => g.name === selectedGenre);
          return genre ? genre.id : null;
        })
        .filter((id) => id !== null);  

      if (genreIds.length > 0) {
        fetchMoviesByGenres(genreIds, currentPage);
      } else {
        setMovies([]); 
      }
    } else {
      fetchMovies(28, currentPage); 
    }
  }, [genreId, user, currentPage, allGenres]);

  const fetchMovies = async (genreId, page) => {
    const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
    const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY, with_genres: genreId, page: page },
      });

      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchMoviesByGenres = async (genreIds, page) => {
    const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
    const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

    try {
      let allMovies = [];

      
      for (const genreId of genreIds) {
        const response = await axios.get(BASE_URL, {
          params: { api_key: API_KEY, with_genres: genreId, page },
        });

        allMovies = [...allMovies, ...response.data.results];
      }

      
      const uniqueMovies = Array.from(new Set(allMovies.map(movie => movie.id)))
        .map(id => allMovies.find(movie => movie.id === id));

      setMovies(uniqueMovies);
      setTotalPages(1); 
    } catch (error) {
      console.error('Error fetching movies by genres:', error);
      setMovies([]);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleGenreClick = (genreId) => {
    
    navigate(`/movies?genre=${genreId}`);
    setCurrentPage(1); 
  };

  const isMovieInCart = (movieId) => {
    return cart.some(movie => movie.id === movieId);
  };

  
  const selectedGenres = allGenres.filter(genre =>
    user?.selectedGenres?.includes(genre.name)
  );

  return (
    <div className="movies-view">
      {/* Left Sidebar: Display User Selected Genres */}
      <div className="genres-container">
        <h3>Select a Genre</h3>
        <div className="genre-list">
          {selectedGenres.length > 0 ? (
            selectedGenres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)} 
                className={`genre-card ${genre.id === parseInt(genreId) ? 'active' : ''}`}
              >
                <h4>{genre.name}</h4>
              </button>
            ))
          ) : (
            <p>Loading genres...</p>
          )}
        </div>
      </div>

      {/* Right Content Area: Movies */}
      <div className="movies-container">
        <div className="selected-genres">
          <h3>Selected Genres:</h3>
          <div className="selected-genres-list">
            {user?.selectedGenres?.map((genre, index) => (
              <span key={index} className="genre-item">
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className="movies-box">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <Link to={`/movies/details/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-image"
                  />
                  <h3>{movie.title}</h3>
                </Link>

                {/* Button to add/remove movie to/from cart */}
                <button 
                  onClick={() => {
                    if (isMovieInCart(movie.id)) {
                      removeFromCart(movie.id);
                    } else {
                      addToCart(movie);
                    }
                  }}
                  className={`buy-button ${isMovieInCart(movie.id) ? 'added' : ''}`}
                >
                  {isMovieInCart(movie.id) ? 'Added' : 'Buy'}
                </button>
              </div>
            ))
          ) : (
            <p>No movies available for the selected genres.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button 
            onClick={handlePrevious} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={handleNext} 
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesView;
