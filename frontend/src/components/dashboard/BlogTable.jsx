import React, { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import axios from "axios";

const BlogTable = ({ blogs = [], onEdit, onDelete }) => {
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    content: "",
    excerpt: "",
    tags: [],
    image: "",
    imageFile: null, // actual file for upload
  });

  const token = localStorage.getItem("token");

  // ─── Open Edit Modal
  const openEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      content: blog.content,
      excerpt: blog.excerpt,
      tags: blog.tags || [],
      image: blog.image,
      imageFile: null,
    });
  };

  // ─── Save Edited Blog
  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("author", formData.author);
      data.append("content", formData.content);
      data.append("excerpt", formData.excerpt);
      data.append("tags", JSON.stringify(formData.tags));

      if (formData.imageFile) {
        data.append("image", formData.imageFile);
      }

      const res = await axios.put(
        `http://localhost:5000/api/blogs/${editingBlog._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      onEdit(res.data); // update parent state
      setEditingBlog(null);
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Failed to update blog.");
    }
  };

  return (
    <div className="md:bg-white dark:bg-gray-800 shadow rounded-xl">
      <h2 className="text-2xl p-5 font-semibold text-gray-900 dark:text-white">
        Blogs List
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left px-4 py-2">Image</th>
              <th className="text-left px-4 py-2">Title</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-left px-4 py-2">Author</th>
              <th className="text-left px-4 py-2">Tags</th>
              <th className="text-left px-4 py-2">Created</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr
                key={blog._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3">
                  <img
                    src={
                      blog.image?.startsWith("http")
                        ? blog.image
                        : blog.image?.startsWith("/uploads")
                          ? `http://localhost:5000${blog.image}`
                          : `http://localhost:5000/uploads/${blog.image}`
                    }
                    alt={blog.title}
                    className="w-12 h-12 rounded-lg object-cover border"
                  />
                </td>

                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {blog.title}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {blog.category}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {blog.author}
                </td>

                <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {blog.tags?.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 flex justify-center items-center gap-2">
                  <button
                    onClick={() => openEdit(blog)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <SquarePen size={22} />
                  </button>

                  <button
                    onClick={() => onDelete(blog._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden px-2">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Top Section */}
            <div className="flex gap-3 items-center">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-16 h-16 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {blog.category} • {blog.author}
                </p>

                 <div className="flex flex-wrap gap-2 mt-2">
                {blog.tags?.map((f, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>

                <p className="text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEdit(blog)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(blog._id)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
        <p className="text-center py-6 text-gray-500 dark:text-gray-300">
          No blogs found
        </p>
      )}

      {/* Edit Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Edit Blog
            </h3>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />

            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />

            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
              rows={4}
            />

            <textarea
              placeholder="Excerpt"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
              rows={2}
            />

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData({
                    ...formData,
                    imageFile: file,
                    image: URL.createObjectURL(file),
                  });
                }
              }}
              className="mb-3 w-full text-sm"
            />

            {/* Image Preview */}
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mb-3"
              />
            )}

            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => setEditingBlog(null)}
                className="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-500 text-white w-full sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white w-full sm:w-auto"
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

export default BlogTable;
