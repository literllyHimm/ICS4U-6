// src/context/UserContext.jsx

import React, { createContext, useContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);

// UserContext provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
