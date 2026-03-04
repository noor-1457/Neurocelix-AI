import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
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
    <nav className="fixed w-full z-50 bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#8F00FF] transition">
          Neurocelix AI
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-white hover:text-[#8F00FF] transition duration-300 relative group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#8F00FF] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          <Link
            to="/auth"
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-[#8F00FF] transition duration-300"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-black"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white px-6 pb-6 space-y-4 transition-all duration-500">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-[#800000] transition"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/dashboard"
            className="block text-gray-700 hover:text-[#800000]"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            className="block px-4 py-2 bg-black text-white rounded-lg hover:bg-[#800000] transition"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
