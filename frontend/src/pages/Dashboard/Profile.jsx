import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { dark, setDark } = useContext(AuthContext);
  const { profile, updateProfile } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Load profile data into form
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
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${dark ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6`}
      >
        <div className="relative">
          <img
            src="https://i.pravatar.cc/120"
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold">{profile?.name}</h2>
          <p className="text-gray-500">{profile?.email}</p>
        </div>
      </motion.div>

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${dark ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-md`}
      >
        <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-3 rounded-lg border dark:bg-gray-900"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 rounded-lg border dark:bg-gray-900"
          />
        </div>

        {/* Password section */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Change Password</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password"
              className="p-3 rounded-lg border dark:bg-gray-900"
            />

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="p-3 rounded-lg border dark:bg-gray-900"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md"
        >
          Save Changes
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;
