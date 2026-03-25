import React, { useState, useEffect, useContext } from "react";
import BlogTable from "../../components/dashboard/BlogTable";
import axios from "axios";
import { Plus } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const API_URL = "http://localhost:5000";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingBlog, setEditingBlog] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    content: "",
    tags: "",
    image: "",
    imageFile: null,
  });

  const token = localStorage.getItem("token");
  const { dark } = useContext(AuthContext); // 🔥 Dark mode state

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || "",
        category: blog.category || "",
        author: blog.author || "",
        content: blog.content || "",
        tags: blog.tags?.join(", ") || "",
        image: blog.image
          ? blog.image.startsWith("http")
            ? blog.image
            : `http://localhost:5000/${blog.image.startsWith("uploads") ? blog.image : "uploads/" + blog.image}`
          : "",
        imageFile: null,
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        category: "",
        author: "",
        content: "",
        tags: "",
        image: "",
        imageFile: null,
      });
    }
    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      if (
        !formData.title ||
        !formData.category ||
        !formData.author ||
        !formData.content
      ) {
        alert("Title, Category, Author, and Content are required!");
        return;
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("author", formData.author);
      data.append("content", formData.content);
      data.append("excerpt", formData.content.slice(0, 150)); // auto excerpt
      data.append("tags", formData.tags); // comma-separated string
      if (formData.imageFile) data.append("image", formData.imageFile);

      if (editingBlog) {
        const res = await axios.put(
          `${API_URL}/api/blogs/${editingBlog._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setBlogs((prev) =>
          prev.map((b) => (b._id === res.data._id ? res.data : b)),
        );
      } else {
        const res = await axios.post(`${API_URL}/api/blogs`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setBlogs((prev) => [res.data, ...prev]);
      }

      setOpenModal(false);
      setFormData({
        title: "",
        category: "",
        author: "",
        content: "",
        tags: "",
        image: "",
        imageFile: null,
      });
      setEditingBlog(null);
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.message || "Failed to save blog.");
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
    <div
      className={`md:p-6 ${dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Header */}
      <div
        className={`p-4 md:p-6 rounded-xl shadow mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 ${dark ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <h1
          className={`text-2xl font-bold ${dark ? " text-white" : " text-gray-900"}`}
        >
          Blogs
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg w-full sm:w-auto justify-center"
        >
          <Plus size={18} /> Add Blog
        </button>
      </div>

      <BlogTable
        blogs={blogs}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        dark={dark}
      />

      {/* Add/Edit Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 overflow-y-auto">
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-130 ${dark ? "text-white" : "text-gray-900"}`}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {editingBlog ? "Edit Blog" : "Add Blog"}
            </h3>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border border-gray-400 rounded-md"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border border-gray-400 rounded-md"
            />
            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border border-gray-400 rounded-md"
            />
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border border-gray-400 rounded-md"
              rows={5}
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border border-gray-400 rounded-md"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file)
                  setFormData({
                    ...formData,
                    imageFile: file,
                    image: URL.createObjectURL(file),
                  });
              }}
              className="w-full mb-3 text-sm"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mb-3"
              />
            )}

            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-500 text-white w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white w-full sm:w-auto"
              >
                {editingBlog ? "Save Changes" : "Add Blog"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
