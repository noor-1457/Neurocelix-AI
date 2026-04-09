import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = ({ dark }) => {
  return (
    <footer
      className={`transition-colors duration-300 ${
        dark ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
        {/* Logo + About */}
        <div>
          <h2 className=" sm:text-2xl mb-3 text-xl font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            Neurocelix AI
          </h2>
          <p className="text-sm leading-relaxed">
            We build smart AI-powered solutions to help businesses grow faster
            and smarter.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-purple-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-purple-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-purple-500">
                Services
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-purple-500">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/pricing" className="hover:text-purple-500">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-purple-500">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/case-studies" className="hover:text-purple-500">
                Case Studies
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-purple-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm mb-2">
            <Mail size={16} />
            <span>support@neurocelix.ai</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm mb-2">
            <Phone size={16} />
            <span>+92 300 0000000</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
            <MapPin size={16} />
            <span>Pakistan</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`text-center px-4 py-4 text-xs sm:text-sm border-t ${
          dark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        © {new Date().getFullYear()} Neurocelix AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
