import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  

  const addToCart = (movie) => {
    if (!cart.some(item => item.id === movie.id)) {
      setCart([...cart, movie]);
    }
  };

  const removeFromCart = (movieId) => {
    setCart(cart.filter(movie => movie.id !== movieId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
