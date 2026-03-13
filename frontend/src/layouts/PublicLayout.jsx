import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PublicLayout({ dark, setDark }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-500">
      <Navbar dark={dark} setDark={setDark} />

      <main>
        {/* Provide dark context to child pages */}
        <Outlet context={{ dark, setDark }} />
      </main>
    </div>
  );
}
