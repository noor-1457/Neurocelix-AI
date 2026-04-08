import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { dark } = useContext(AuthContext);
  const { profile, updateProfile } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (formData.password && formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      await updateProfile({
        name: formData.name,
        email: formData.email,
      });

      alert("Profile updated successfully");
    } catch (err) {
      alert("Profile update failed");
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-500 ${
        dark ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6 border transition-all duration-500 ${
            dark
              ? "bg-gray-900/70 border-gray-800 backdrop-blur-xl"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="relative group">
            <img
              src="https://i.pravatar.cc/120"
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-lg"
            />
            <div className="absolute inset-0 rounded-full bg-purple-500/20 opacity-0 group-hover:opacity-100 transition" />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{profile?.name}</h2>
            <p className={`${dark ? "text-gray-400" : "text-gray-600"}`}>
              {profile?.email}
            </p>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-8 rounded-2xl shadow-xl border transition-all duration-500 ${
            dark
              ? "bg-gray-900/70 border-gray-800 backdrop-blur-xl"
              : "bg-white border-gray-200"
          }`}
        >
          <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                dark
                  ? "bg-gray-800 border-gray-700 placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 placeholder-gray-500"
              }`}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                dark
                  ? "bg-gray-800 border-gray-700 placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 placeholder-gray-500"
              }`}
            />
          </div>

          {/* Password section */}
          <div className="mt-10">
            <h4
              className={`text-lg font-semibold mb-4 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Change Password
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                  dark
                    ? "bg-gray-800 border-gray-700 placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 placeholder-gray-500"
                }`}
              />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                  dark
                    ? "bg-gray-800 border-gray-700 placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 placeholder-gray-500"
                }`}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="mt-10 w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition duration-300 font-medium shadow-lg"
          >
            Save Changes
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
