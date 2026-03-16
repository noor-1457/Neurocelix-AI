import React, { useState, useEffect } from "react";
import BlogTable from "../../components/dashboard/BlogTable";
import axios from "axios";


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({ title: "", category: "", author: "" });

  // ─── Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
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

  // ─── Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog.");
    }
  };

  // ─── Open edit modal
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      category: blog.category,
      author: blog.author,
    });
  };

  // ─── Save edited blog
  const handleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/blogs/${editingBlog._id}`, formData);
      setBlogs((prev) => prev.map((b) => (b._id === res.data._id ? res.data : b)));
      setEditingBlog(null);
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Failed to update blog.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <div className="w-15 h-15 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6 dark:text-white">
  Blogs
</h1>

      <BlogTable blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Edit Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-130">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Edit Blog</h3>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full mb-3 px-3 py-2 border border-gray-400 rounded-md"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full mb-3 px-3 py-2 border border-gray-400 rounded-md"
            />
            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full mb-4 px-3 py-2 border border-gray-400 rounded-md"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingBlog(null)}
                className="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;