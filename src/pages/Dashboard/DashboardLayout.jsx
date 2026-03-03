import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <Sidebar isOpen={isOpen} />
      
      <div className="flex-1 flex flex-col">
        <Topbar toggle={() => setIsOpen(!isOpen)} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;