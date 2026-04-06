// src/pages/AdminLogin.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ShieldCheck } from "lucide-react";

const AuthPage = ({ dark }) => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${dark ? "bg-gray-900" : "bg-gray-100"} p-4`}
    >
      {/* Login Card */}
      <div
        className={`w-full mt-15 max-w-md ${dark ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl p-8`}
      >
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full mb-3">
            <ShieldCheck size={32} className="text-indigo-600" />
          </div>

          <h2
            className={`text-2xl font-bold ${dark ? "text-gray-100" : "text-gray-800"}`}
          >
            Admin Panel Login
          </h2>

          <p
            className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"} mt-1`}
          >
            Access dashboard securely
          </p>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Login as Admin
          </button>
        </form>
        {/* Demo Credentials */}
        <div
          className={`mt-6 ${dark ? "bg-gray-600" : "bg-gray-50"} border rounded-lg p-4 text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}
        >
          <p
            className={`font-semibold ${dark ? "text-gray-200" : "text-gray-700"} mb-2`}
          >
            Recruiter Admin Credentials
          </p>

          <p>
            <span className="font-medium">Email:</span> admin@codecelix.com
          </p>

          <p>
            <span className="font-medium">Password:</span> admin123
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Admin Dashboard
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
