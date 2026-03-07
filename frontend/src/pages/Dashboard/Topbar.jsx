import React from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom"; // React Router ke liye


const Topbar = ({ toggle }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      
      {/* Left Section: Menu + Home */}
      <div className="flex items-center gap-7">
        <button onClick={toggle} className="text-gray-700 dark:text-gray-200">
          <ChevronLeft />
        </button>
      </div>

      {/* Right Section: Profile */}
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full w-10 h-10"
        />
      </div>
    </div>
  );
};

export default Topbar;