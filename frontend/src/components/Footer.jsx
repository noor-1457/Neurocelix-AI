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
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-purple-600 mb-3">
            Neurocelix AI
          </h2>
          <p className="text-sm">
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

          <div className="flex items-center gap-2 text-sm mb-2">
            <Mail size={16} />
            <span>support@neurocelix.ai</span>
          </div>

          <div className="flex items-center gap-2 text-sm mb-2">
            <Phone size={16} />
            <span>+92 300 0000000</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} />
            <span>Pakistan</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`text-center py-4 text-sm border-t ${
          dark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        © {new Date().getFullYear()} Neurocelix AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
