// src/components/Dashboard/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart2,
  LogOut,
  X,
  BarChart3,
  FileText,
  Briefcase,
  CircleUserRound,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout, dark, setDark } = useContext(AuthContext);
  const location = useLocation();

  const navLinks = [
    { name: "Overview", path: "/dashboard", icon: <Home size={20} /> },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <BarChart2 size={20} />,
    },
    { name: "Blogs", path: "/dashboard/blogs", icon: <FileText size={20} /> },
    {
      name: "Case Studies",
      path: "/dashboard/case-studies",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Services",
      path: "/dashboard/services-private",
      icon: <Briefcase size={20} />,
    },
    {
      name: "Contacts",
      path: "/dashboard/contacts",
      icon: <CircleUserRound size={20} />,
    },
  ];

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 
          ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} 
          shadow-xl z-50
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/dashboard" onClick={handleClose}>
              <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                Codecelix
              </h2>
            </Link>
            <button className="lg:hidden p-2" onClick={handleClose}>
              <X size={22} className="text-gray-700 dark:text-gray-200" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleClose}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200
    ${
      isActive
        ? "bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-white shadow-sm"
        : "hover:bg-gray-100 dark:hover:bg-purple-700 hover:text-gray-900 dark:hover:text-white"
    }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-500 mt-6 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-700/30 transition-all duration-200"
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
