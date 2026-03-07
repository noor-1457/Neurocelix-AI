import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home,
  BarChart2,
  User,
  FileText,
  Users,
  LogOut,
  CircleUserRound,
  Box
} from "lucide-react";

const Sidebar = ({ isOpen }) => {
  return (
    <motion.div
      animate={{ width: isOpen ? 230 : 80 }}
      className="bg-white dark:bg-gray-800 shadow-lg h-full p-4 transition-all"
    >
      <Link to="/">
        <h2 className="text-xl font-bold mb-8 text-purple-600 cursor-pointer">
          {isOpen ? "Codecelix" : "CC"}
        </h2>
      </Link>

      <nav className="space-y-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:text-purple-600"
        >
          <Home size={20} />
          {isOpen && "Overview"}
        </Link>

        <Link
          to="/dashboard/analytics"
          className="flex items-center gap-3 hover:text-purple-600"
        >
          <BarChart2 size={20} />
          {isOpen && "Analytics"}
        </Link>

        <Link
          to="/dashboard/profile"
          className="flex items-center gap-3 hover:text-purple-600"
        >
          <User size={20} />
          {isOpen && "Profile"}
        </Link>
        <Link
          to="/dashboard/users"
          className="flex items-center gap-3 hover:text-purple-600"
        >
          <Users size={20} />
          {isOpen && "Users"}
        </Link>
        <Link
          to="/dashboard/blogs"
          className="flex items-center gap-3 hover:text-purple-600"
        >
          <FileText size={20} />
          {isOpen && "Blogs"}
        </Link>
        <Link
          to="/dashboard/services-private"
          className="flex items-center gap-3 hover:text-purple-600"
        >
          <Box size={20} />
          {isOpen && "Services"}
        </Link>
        <Link
          to="/dashboard/contacts"
          className="flex items-center gap-3 hover:text-purple-600"
        >
          <CircleUserRound size={20} />
          {isOpen && "Contacts"}
        </Link>

        <button className="flex items-center gap-3 text-red-500 mt-10">
          <LogOut size={20} />
          {isOpen && "Logout"}
        </button>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
