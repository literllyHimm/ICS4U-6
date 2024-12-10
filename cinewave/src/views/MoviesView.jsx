import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // Importing useCart to interact with the cart context
import '../styles/MoviesView.css';

const MoviesView = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const genreId = new URLSearchParams(location.search).get('genre');
  
  const { cart, addToCart } = useCart();  // Use the cart context

  // List of specific genre IDs you want to display
  const specificGenres = [
    28, 80, 27, 53, 12, 10751, 10402, 10752, 16, 14, 9648, 37, 35, 36, 878
  ];

  useEffect(() => {
    fetchGenres();
    if (genreId) {
      fetchMovies(genreId, currentPage);
    }
  }, [genreId, currentPage]);  // Re-fetch movies when genreId or currentPage changes

  const fetchMovies = async (genreId, page) => {
    const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
    const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY, with_genres: genreId, page: page },
      });
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);  // Set total pages based on the API response
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchGenres = async () => {
    const API_KEY = '9e9ae8b4151b5a20e5c95911ff07c4e4';
    const BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list';

    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY },
      });

      // Filter genres based on the specific genres you want to display
      const filteredGenres = response.data.genres.filter(genre =>
        specificGenres.includes(genre.id)
      );

      setGenres(filteredGenres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to check if the movie is in the cart
  const isMovieInCart = (movieId) => {
    return cart.some(movie => movie.id === movieId);
  };

  return (
    <div className="movies-view">
      {/* Left Sidebar: Genres */}
      <div className="genres-container">
        <h3>Select a Genre</h3>
        <div className="genre-list">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/movies?genre=${genre.id}`}
              className="genre-card"
            >
              <h4>{genre.name}</h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Content Area: Movies */}
      <div className="movies-container">
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
                
                {/* Button to add movie to cart */}
                <button 
                  onClick={() => addToCart(movie)}
                  className="buy-button"
                >
                  {isMovieInCart(movie.id) ? 'Added' : 'Buy'}
                </button>
              </div>
            ))
          ) : (
            <p>No movies available for this genre.</p>
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
