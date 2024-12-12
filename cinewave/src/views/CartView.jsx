import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; 
import "../styles/CartView.css";
import axios from "axios"; 

const CartView = () => {
  const { cart, removeFromCart } = useCart();
  const [movieDetails, setMovieDetails] = useState({});
  useEffect(() => {
    const fetchTrailers = async () => {
      const details = {};
      for (const movie of cart) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
            {
              params: { api_key: "9e9ae8b4151b5a20e5c95911ff07c4e4" },
            }
          );
          const trailers = response.data.results.filter(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          if (trailers.length > 0) {
            details[movie.id] = `https://img.youtube.com/vi/${trailers[0].key}/0.jpg`;
          } else {
            details[movie.id] = `https://image.tmdb.org/t/p/w200${movie.poster_path}`; 
          }
        } catch (error) {
          console.error("Error fetching trailer:", error);
          details[movie.id] = `https://image.tmdb.org/t/p/w200${movie.poster_path}`; 
        }
      }
      setMovieDetails(details);
    };

    fetchTrailers();
  }, [cart]);

  return (
    <div className="cart-view-container">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((movie) => (
            <div key={movie.id} className="cart-item">
              <img
                src={movieDetails[movie.id]}
                alt={movie.title}
                className="movie-image"
              />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <button
                  onClick={() => removeFromCart(movie.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartView;
