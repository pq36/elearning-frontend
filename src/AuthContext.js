// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("isLoggedIn") === "true"
  );

  const login = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Sync state with sessionStorage in case it updates elsewhere
    const storedStatus = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedStatus);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
