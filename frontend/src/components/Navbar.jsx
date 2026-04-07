import { useState } from "react";
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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-500 ${
        dark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#8F00FF]">
          Neurocelix AI
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-[#8F00FF] font-medium hover:text-[#8F00FF] transition relative group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#8F00FF] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Desktop Dark Mode Toggle & Login */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => setDark(!dark)}
            className={`
              relative flex items-center border justify-center
              w-11 h-11 rounded-xl
             ${dark ? "bg-purple-700" : "bg-white"}
              shadow-md`}
          >
            {dark ? (
              <Sun className="w-5 h-5 transition-all duration-300 rotate-0" />
            ) : (
              <Moon className="w-5 h-5 transition-all duration-300 rotate-0" />
            )}
          </button>

          <Link
            to="/auth"
            className="px-4 py-2 rounded-lg bg-[#8F00FF] text-white hover:bg-[#8F00FF] transition-colors"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-black dark:text-white"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-6 pb-6 space-y-4 transition-all duration-500 bg-white dark:bg-gray-800">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 dark:text-gray-200 hover:text-[#800000] transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/auth"
            className="block px-4 py-2 bg-[#8F00FF] text-white rounded-lg hover:bg-[#800000] transition-colors"
          >
            Login
          </Link>

          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition-colors"
          >
            {dark ? "☀" : "🌙"}
          </button>
        </div>
      )}
    </nav>
  );
}
