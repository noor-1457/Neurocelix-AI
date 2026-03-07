import React, { useState, useEffect } from "react";
import BlogTable from "../../components/dashboard/BlogTable";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs"); // backend URL
      // res.data = array of blogs directly (jaise Postman me aaya)
      setBlogs(res.data); // ✅ set only array
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Blogs</h1>
      <BlogTable blogs={blogs} onEdit={(b) => console.log("Edit", b)} onDelete={(id) => console.log("Delete", id)} />
    </div>
  );
};

export default Blogs;