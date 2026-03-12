import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Home,
  BarChart2,
  User,
  FileText,
  LogOut,
  CircleUserRound,
  Box,
  BarChart3,
} from "lucide-react";

const Sidebar = ({ isOpen }) => {

  const { logout, profile } = useContext(AuthContext);

  const linkClass =
    "flex items-center font-medium gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-purple-100 hover:text-purple-600";

  // agar admin nahi hai to sidebar hide
  if (profile?.role !== "admin") return null;

  return (
    <motion.div
      animate={{ width: isOpen ? 250 : 80 }}
      className="bg-white shadow-lg h-full p-4 transition-all"
    >
      <Link to="/">
        <h2 className="text-xl font-bold mb-8 text-purple-600 cursor-pointer">
          {isOpen ? "Codecelix" : "CC"}
        </h2>
      </Link>

      <nav className="space-y-2">
        <Link to="/dashboard" className={linkClass}>
          <Home size={20} />
          {isOpen && "Overview"}
        </Link>
        <Link to="/dashboard/analytics" className={linkClass}>
          <BarChart2 size={20} />
          {isOpen && "Analytics"}
        </Link>
        <Link to="/dashboard/profile" className={linkClass}>
          <User size={20} />
          {isOpen && "Profile"}
        </Link>
        <Link to="/dashboard/blogs" className={linkClass}>
          <FileText size={20} />
          {isOpen && "Blogs"}
        </Link>
        <Link to="/dashboard/services-private" className={linkClass}>
          <Box size={20} />
          {isOpen && "Services"}
        </Link>
        <Link to="/dashboard/case-studies" className={linkClass}>
          <BarChart3 size={20} />
          {isOpen && "Case Studies"}
        </Link>
        <Link to="/dashboard/contacts" className={linkClass}>
          <CircleUserRound size={20} />
          {isOpen && "Contacts"}
        </Link>
        <button
          onClick={logout}
          className="flex items-center px-3 py-2 rounded-lg text-red-500 hover:bg-red-100 transition-all duration-300"
        >
          <LogOut size={20} />
          {isOpen && "Logout"}
        </button>
      </nav>
    </motion.div>
  );
};

export default Sidebar;