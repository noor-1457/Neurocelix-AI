import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
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
  X
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout, profile } = useContext(AuthContext);
  const location = useLocation();

  if (profile?.role !== "admin") return null;

  const linkClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-300
    ${
      location.pathname === path
        ? "bg-purple-100 text-purple-600"
        : "hover:bg-purple-100 hover:text-purple-600"
    }`;

  const handleClose = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-[250px] bg-white shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-4">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/" onClick={handleClose}>
              <h2 className="text-xl font-bold text-purple-600">
                Codecelix
              </h2>
            </Link>

            <button
              className="lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">

            <Link to="/dashboard" onClick={handleClose} className={linkClass("/dashboard")}>
              <Home size={20} />
              Overview
            </Link>

            <Link to="/dashboard/analytics" onClick={handleClose} className={linkClass("/dashboard/analytics")}>
              <BarChart2 size={20} />
              Analytics
            </Link>

            <Link to="/dashboard/blogs" onClick={handleClose} className={linkClass("/dashboard/blogs")}>
              <FileText size={20} />
              Blogs
            </Link>

            <Link to="/dashboard/services-private" onClick={handleClose} className={linkClass("/dashboard/services-private")}>
              <Box size={20} />
              Services
            </Link>

            <Link to="/dashboard/case-studies" onClick={handleClose} className={linkClass("/dashboard/case-studies")}>
              <BarChart3 size={20} />
              Case Studies
            </Link>

            <Link to="/dashboard/contacts" onClick={handleClose} className={linkClass("/dashboard/contacts")}>
              <CircleUserRound size={20} />
              Contacts
            </Link>

          </nav>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 mt-4 rounded-lg text-red-500 hover:bg-red-100 transition-all duration-300"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;