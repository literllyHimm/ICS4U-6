// src/context/CartContext.jsx

import React, { createContext, useState, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  // Track movies in the cart

  // Add a movie to the cart
  const addToCart = (movie) => {
    if (!cart.some(item => item.id === movie.id)) {
      setCart([...cart, movie]);
    }
  };

  // Remove a movie from the cart
  const removeFromCart = (movieId) => {
    setCart(cart.filter(movie => movie.id !== movieId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
