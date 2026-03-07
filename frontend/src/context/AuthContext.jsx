// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Auth state
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);

  // Set token in axios header
  const setAxiosToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Load profile
  const loadProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/profile");
      setProfile(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  // Load on mount
  useEffect(() => {
    setAxiosToken(token);

    const initAuth = async () => {
      if (token) {
        await loadProfile();
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const token = res.data.token;

      localStorage.setItem("token", token);
      setToken(token);
      setAxiosToken(token);

      await loadProfile();

      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      throw err;
    }
  };

  // Signup
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      const token = res.data.token;

      localStorage.setItem("token", token);
      setToken(token);
      setAxiosToken(token);

      await loadProfile();

      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      throw err;
    }
  };

  // Update profile
  const updateProfile = async (data) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        data
      );

      setProfile(res.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setProfile(null);
    setIsAuthenticated(false);
    setAxiosToken(null);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        profile,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};