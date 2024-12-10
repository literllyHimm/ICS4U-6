import React from 'react';
import { useCart } from '../context/CartContext';  // Import useCart
import '../styles/CartView.css';

const CartView = () => {
  const { cart, removeFromCart } = useCart();  // Access cart and removeFromCart from CartContext

  return (
    <div className="cart-view-container">
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((movie) => (
            <div key={movie.id} className="cart-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-image"
              />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <button onClick={() => removeFromCart(movie.id)} className="remove-button">
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
