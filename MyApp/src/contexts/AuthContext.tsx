// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  toggleAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const toggleAuth = () => setAuthenticated(prev => !prev);
  return <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
