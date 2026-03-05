// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 1️⃣ Create Context
export const AuthContext = createContext();

// 2️⃣ Provider Component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // 3️⃣ Auth state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);

  // 4️⃣ Set token in axios headers
  const setAxiosToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // 5️⃣ Load user profile on mount if token exists
  useEffect(() => {
    setAxiosToken(token);
    const loadUser = async () => {
      if (token) {
        try {
          const res = await axios.get("http://localhost:5000/api/auth/profile");
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          console.error(err);
          logout(); // invalid token
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  // 6️⃣ Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      setAxiosToken(token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      throw err;
    }
  };

  // 7️⃣ Signup function
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      setAxiosToken(token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      throw err;
    }
  };

  // 8️⃣ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setAxiosToken(null);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};