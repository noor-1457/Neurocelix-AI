import React from "react";
import { Menu } from "lucide-react";

const Topbar = ({ toggle }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <button onClick={toggle}>
        <Menu />
      </button>

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