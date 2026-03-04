import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      
      <div className="bg-white mt-5 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 text-white w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-4">
            {isLogin ? "Welcome Back!" : "Join Us Today!"}
          </h2>
          <p className="text-center mb-6">
            {isLogin
              ? "Login to continue your journey with us."
              : "Create an account to start your journey."}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-300"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600 md:hidden">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 cursor-pointer ml-2 font-semibold"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;