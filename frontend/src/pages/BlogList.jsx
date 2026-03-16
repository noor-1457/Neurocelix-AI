import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";

const BlogList = () => {
  const { dark } = useOutletContext(); // global dark mode
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.log("Error fetching blogs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

 if (loading) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen gap-3 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="w-15 h-15 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className={`${dark ? "text-gray-400" : "text-gray-500"} text-sm`}>
        Loading...
      </p>
    </div>
  );
}

  return (
    <div
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        dark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <motion.h1
        className={`text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
          dark ? "text-white" : "text-gray-900"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Blog
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} dark={dark} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
