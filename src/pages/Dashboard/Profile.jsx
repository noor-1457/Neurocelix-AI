import React, { useState } from "react";
import { motion } from "framer-motion";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Rukhsar Yaqoob",
    email: "rukhsar@example.com",
    company: "Codecelix",
    role: "Frontend Developer",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6"
      >
        <div className="relative">
          <img
            src="https://i.pravatar.cc/120"
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500"
          />
          <button className="absolute bottom-0 right-0 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
            Edit
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold">{formData.name}</h2>
          <p className="text-gray-500">{formData.role}</p>
          <p className="text-sm text-gray-400">{formData.company}</p>
        </div>
      </motion.div>

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
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

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="p-3 rounded-lg border dark:bg-gray-900"
          />

          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            className="p-3 rounded-lg border dark:bg-gray-900"
          />
        </div>

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
          className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md"
        >
          Save Changes
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;