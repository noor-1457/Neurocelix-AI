import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar({ dark, setDark }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "FAQ", path: "/faq" },
    { name: "Blog", path: "/blog" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-300 ${
        dark ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Navbar Top */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Neurocelix AI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="text-[#8F00FF] font-medium relative group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#8F00FF] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow bg-gray-200 dark:bg-purple-700"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/auth"
            className="px-4 py-2 rounded-lg bg-[#8F00FF] text-white"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={`lg:hidden text-black  ${dark ? "bg-gray-900 text-gray-100" : "bg-white"}`}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* ================= MOBILE DRAWER ================= */}

      <div
        className={`fixed h-screen top-0 left-0 w-full lg:hidden z-50
  transition-all duration-500 p-4 backdrop-blur-md overflow-y-auto
  ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
  ${dark ? "bg-gray-900/95 text-gray-100" : "bg-white/95"}
  `}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b dark:border-gray-700 shrink-0">
          <h2 className="text-xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            Neurocelix AI
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <X size={26} />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 ">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center py-3 rounded-xl font-medium
        ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"}
        hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 
        hover:text-white 
        transition-all duration-300 
        shadow-sm hover:shadow-xl 
        active:scale-95 hover:scale-[1.02]`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="absolute left-0 w-full px-6 space-y-4">
          {/* Admin Button */}
          <Link
            to="/auth"
            onClick={() => setIsOpen(false)}
            className="block text-center py-3 rounded-xl 
      bg-gradient-to-r from-purple-600 to-pink-500 
      text-white font-semibold shadow-lg hover:shadow-xl 
      transition-all duration-300 active:scale-95"
          >
            Admin Login
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl
      ${dark ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}
      hover:scale-[1.02] transition-all mb-4 duration-300`}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
            <span>{dark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
