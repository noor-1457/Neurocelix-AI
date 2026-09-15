import React, { useContext } from "react";
import { ChevronLeft, Menu, Sun, Moon } from "lucide-react";
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
          className={`lg:hidden ${dark ? "text-gray-100" : "bg-white"}`}
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
          Admin Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Dark/Light Toggle */}
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
        {/* Profile Image */}
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-9 h-9 md:w-12 md:h-12 rounded-full object-cover cursor-pointer border"
          onClick={() => navigate("/dashboard/profile")}
        />
      </div>
    </header>
  );
};

export default Topbar;
