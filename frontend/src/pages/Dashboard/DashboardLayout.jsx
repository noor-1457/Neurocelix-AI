// src/pages/Dashboard/DashboardLayout.jsx
import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { dark } = useContext(AuthContext);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all
          ${dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"}`}
      >
        {/* Topbar */}
        <Topbar setIsOpen={setIsOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
