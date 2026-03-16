import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative flex h-screen bg-purple-50 dark:bg-gray-900 transition-all">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="z-30 bg-black/40 backdrop-blur-sm"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Topbar */}
        <Topbar
          setIsOpen={setIsOpen}
          className="z-30 bg-black/40 backdrop-blur-sm"
        />

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto relative z-30">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;