import React, { createContext, useContext, useState, useEffect } from 'react';
export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); 
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);


  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData)); 
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
