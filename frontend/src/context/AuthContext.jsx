import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  /* ================= AUTH STATE ================= */

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);

  /* ================= DARK MODE ================= */

  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  );

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  /* ================= LOAD PROFILE ================= */

  const loadProfile = async () => {
    try {
      const res = await api.get("/auth/profile");

      setProfile(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  /* ================= INIT AUTH ================= */

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        await loadProfile();
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  /* ================= LOGIN ================= */

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setProfile(user);
      setIsAuthenticated(true);

      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      throw err;
    }
  };

  /* ================= SIGNUP ================= */

  const signup = async (name, email, password) => {
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setProfile(user);
      setIsAuthenticated(true);

      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      throw err;
    }
  };

  /* ================= UPDATE PROFILE ================= */

  const updateProfile = async (data) => {
    try {
      const res = await api.put("/auth/profile", data);

      setProfile(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setProfile(null);
    setIsAuthenticated(false);

    navigate("/auth");
  };

  /* ================= CONTEXT ================= */

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
        dark,
        setDark,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};