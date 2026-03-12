import React from "react";
import { ChevronLeft, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Topbar = ({ setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-30">

      {/* Left Section */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Mobile Sidebar Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-gray-700"
        >
          <Menu size={24} />
        </button>

        {/* Back to Home */}
        <Link
          to="/"
          className="flex items-center text-gray-700 hover:text-purple-600 transition"
        >
          <ChevronLeft size={22} />
        </Link>

        {/* Title (optional) */}
        <h1 className="hidden sm:block font-semibold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {/* Profile Image */}
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover cursor-pointer border"
          onClick={() => navigate("/dashboard/profile")}
        />

      </div>
    </header>
  );
};

export default Topbar;