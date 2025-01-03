import React, { useEffect, useState } from 'react';  
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../context/UserContext'; 
import '../styles/GenresPage.css';

const GenresPage = () => {
  const { user } = useUserContext();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const API_KEY = "9e9ae8b4151b5a20e5c95911ff07c4e4"; 
    const BASE_URL = "https://api.themoviedb.org/3/genre/movie/list";

    
    const specificGenres = [
      28, 80, 27, 53, 12, 10751, 10402, 10752, 16, 14, 9648, 37, 35, 36, 878
    ];

    try {
      const response = await axios.get(BASE_URL, {
        params: { api_key: API_KEY },
      });

      
      const filteredGenres = response.data.genres.filter(genre =>
        specificGenres.includes(genre.id)
      );

      if (user && user.selectedGenres) {
        setGenres(filteredGenres.filter(genre => user.selectedGenres.includes(genre.name)));
      } else {
        setGenres(filteredGenres);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  return (
    <div className="genres-page">
      <h2>Select a Genre</h2>
      <div className="genre-list">
        {genres.length > 0 ? (
          genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/movies?genre=${genre.id}`}
              className="genre-card"
            >
              <h3>{genre.name}</h3> {/* Display Genre Name */}
            </Link>
          ))
        ) : (
          <p>Loading genres...</p> 
        )}
      </div>
    </div>
  );
};

export default GenresPage;
