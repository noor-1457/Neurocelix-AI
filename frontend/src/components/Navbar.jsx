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
  useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [dark]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-300 ${
        dark ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Navbar Top */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold text-[#8F00FF]">
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
          className="lg:hidden text-black dark:text-white"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* ================= MOBILE DRAWER ================= */}

      <div
        className={`fixed top-0 left-0 w-full h-screen lg:hidden
        transition-all duration-500 p-4
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${dark ? "bg-gray-900" : "bg-white"}
       `}
       >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold text-[#8F00FF]">Neurocelix AI</h2>

          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4 mx-2 my-3 text-lg">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="font-medium text-gray-600 dark:text-gray-50"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="space-y-4">
          <Link
            to="/auth"
            onClick={() => setIsOpen(false)}
            className="block text-center py-3 rounded-lg bg-[#8F00FF] text-white font-semibold"
          >
            Admin Login
          </Link>

          <button
            onClick={() => setDark(!dark)}
            className="w-full flex justify-center py-3 rounded-lg bg-gray-200 dark:bg-purple-700"
          >
            {dark ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
