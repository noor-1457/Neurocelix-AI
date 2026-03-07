import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import PublicServices from "./pages/PublicServices";
import CaseStudies from "./pages/CaseStudies";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Analytics from "./pages/Dashboard/Analytics";
import Profile from "./pages/Dashboard/Profile";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import FAQ from "./pages/FAQ";
import Users from "./pages/Dashboard/Users";
import Blogs from "./pages/Dashboard/Blogs";
import Contacts from "./pages/Dashboard/Contacts";
import Services from "./pages/Dashboard/Services";

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
      <AuthProvider>
        <Routes>
          {/* Public Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<PublicServices />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>

          {/* Dashboard Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<Users />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="services-private" element={<Services />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
