import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import About from "./pages/About.jsx";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Services from "./pages/Services.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-black">
        <h1 className="text-4xl font-bold text-white mb-5">Neurocelix AI</h1>
        <div className="w-16 h-16 border-4 border-t-[#800000] border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/case-studies" element={<CaseStudies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
