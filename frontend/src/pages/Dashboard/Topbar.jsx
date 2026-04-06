import React, { useContext } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Topbar = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const { dark, setDark } = useContext(AuthContext);

  return (
    <header
      className={`${dark ? "bg-purple-700" : "bg-white"} shadow-sm px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-30 transition-colors`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Mobile Sidebar Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-gray-700 dark:text-gray-200"
        >
          <Menu size={24} />
        </button>

        {/* Back to Home */}
        <Link
          to="/"
          className="flex items-center text-gray-700 dark:text-gray-200 hover:text-purple-600 transition"
        >
          <ChevronLeft size={22} />
        </Link>

        {/* Title (optional) */}
        <h1 className="hidden sm:block font-semibold text-gray-800 dark:text-white">
          Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Dark/Light Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className=" px-3 py-2 rounded-lg 
              bg-gray-200 dark:bg-gray-700 
              text-gray-800 dark:text-gray-100 
              rounded-full transition-all duration-200 hover:scale-[1.02]"
        >
          {dark ? "☀" : "🌙"}
        </button>
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
