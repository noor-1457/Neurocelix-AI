import React, { useState, useEffect, useContext } from "react";
import BlogTable from "../../components/dashboard/BlogTable";
import { Plus } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  deleteBlog,
  addBlog,
  updateBlog,
} from "../../features/blogs/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();

  const { blogs, loading } = useSelector((state) => state.blogs);

  const { dark } = useContext(AuthContext);

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

  // FETCH BLOGS
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Delete blog?")) return;
    dispatch(deleteBlog(id));
  };

  // OPEN MODAL
  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || "",
        category: blog.category || "",
        author: blog.author || "",
        content: blog.content || "",
        tags: blog.tags?.join(", ") || "",
        image: blog.image || "",
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

  // SAVE BLOG
  const handleSave = () => {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("author", formData.author);
    data.append("content", formData.content);
    data.append("excerpt", formData.content.slice(0, 150));

    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    tagsArray.forEach((tag) => {
      data.append("tags[]", tag);
    });

    if (formData.imageFile) {
      data.append("image", formData.imageFile);
    }

    if (editingBlog) {
      dispatch(updateBlog({ id: editingBlog._id, data }));
    } else {
      dispatch(addBlog(data));
    }

    setOpenModal(false);
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
    <div className={`p-4 md:p-6 ${dark ? "bg-gray-900 text-white" : ""}`}>
      {/* HEADER */}
      <div
        className={` ${
          dark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } rounded-xl shadow mb-4`}
      >
        <div
          className={`flex flex-col sm:flex-row p-4 md:p-6 sm:items-center sm:justify-between gap-4`}
        >
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold">Blogs</h1>

          {/* Button */}
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center font-semibold justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full sm:w-auto"
          >
            <Plus size={18} />
            Add Blog
          </button>
        </div>
      </div>
      <BlogTable
        blogs={blogs}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        dark={dark}
      />

      {/* MODAL same as yours */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          {/* Modal Box */}
          <div
            className={`w-full max-w-2xl rounded-xl shadow-2xl p-6 space-y-4 
      ${
        dark
          ? "bg-gray-900 border border-gray-700 text-white"
          : "bg-white text-gray-800"
      }`}
          >
            {/* Title */}
            <h2 className="text-xl font-semibold">
              {editingBlog ? "Edit Blog" : "Add Blog"}
            </h2>

            {/* Inputs */}
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={`w-full px-3 py-2 rounded-lg border ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  : "bg-white border-gray-300"
              }`}
            />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className={`w-full px-3 py-2 rounded-lg border ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  : "bg-white border-gray-300"
              }`}
            />

            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className={`w-full px-3 py-2 rounded-lg border ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  : "bg-white border-gray-300"
              }`}
            />

            <textarea
              placeholder="Content"
              rows="4"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className={`w-full px-3 py-2 rounded-lg border ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  : "bg-white border-gray-300"
              }`}
            />

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className={`w-full px-3 py-2 rounded-lg border ${
                dark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  : "bg-white border-gray-300"
              }`}
            />

            {/* Image Upload */}
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, imageFile: e.target.files[0] })
              }
              className={`w-full ${dark ? "text-gray-300" : ""}`}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setOpenModal(false)}
                className={`px-4 py-2 rounded-lg ${
                  dark
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                {editingBlog ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
