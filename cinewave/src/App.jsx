import React from 'react';   
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';  // Import UserProvider
import { CartProvider } from './context/CartContext';  // Import CartProvider
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import MoviesView from './views/MoviesView';
import GenresPage from './views/GenresPage';
import DetailView from './views/DetailView'; 
import CartView from './views/CartView';
import SettingsView from './views/SettingsView';
import Header from './Components/Header';

const App = () => {
  return (
    <UserProvider> 
      <CartProvider>  {/* Wrap your app with CartProvider */}
        <Router>
          <Header /> {/* Header will now render dynamic navigation links based on user state */}
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/movies" element={<MoviesView />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/movies/details/:id" element={<DetailView />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </Router>
      </CartProvider> 
    </UserProvider>
  );
};

export default App;
