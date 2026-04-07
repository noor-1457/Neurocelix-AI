import React, { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateBlog } from "../../features/blogs/blogSlice";

const BlogTable = ({ blogs = [], onDelete, dark }) => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();

  const [editingBlog, setEditingBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    content: "",
    excerpt: "",
    tags: "",
    image: "",
    imageFile: null,
  });

  const openEdit = (blog) => {
    setEditingBlog(blog);

    setFormData({
      title: blog.title || "",
      category: blog.category || "",
      author: blog.author || "",
      content: blog.content || "",
      excerpt: blog.excerpt || "",
      tags: blog.tags?.join(", ") || "",
      image: blog.image || "",
      imageFile: null,
    });
  };

  const handleSave = () => {
    if (!editingBlog) return;

    const data = new FormData();

    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("author", formData.author);
    data.append("content", formData.content);
    data.append("excerpt", formData.excerpt || formData.content.slice(0, 150));

    const tagsArray = formData.tags
      ? formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    tagsArray.forEach((tag) => {
      data.append("tags[]", tag);
    });

    if (formData.imageFile) {
      data.append("image", formData.imageFile);
    }

    dispatch(
      updateBlog({
        id: editingBlog._id,
        blogData: data,
      }),
    );

    setEditingBlog(null);
  };

  return (
    <div>
      {/* ================= DESKTOP TABLE ================= */}
      <div
        className={`hidden md:block overflow-x-auto rounded-xl shadow ${
          dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl p-5 font-semibold">Blogs List</h2>

        <table className="min-w-full border-collapse">
          <thead className={`${dark ? "bg-gray-800" : "bg-gray-50"}`}>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Tags</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="px-4 py-3">
                  <img
                    src={
                      blog.image?.startsWith("http")
                        ? blog.image
                        : `${SERVER_URL}${blog.image}`
                    }
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-3">{blog.title}</td>
                <td className="px-4 py-3">{blog.category}</td>
                <td className="px-4 py-3">{blog.author}</td>

                <td className="p-4 font-medium">
                  {blog.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-1 mx-1 rounded ${
                        dark
                          ? "bg-purple-700 text-purple-100"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </td>

                <td className="px-4 py-3">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => openEdit(blog)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <SquarePen size={20} />
                    </button>

                    <button
                      onClick={() => onDelete(blog._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className={`p-4 rounded-xl shadow ${
              dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <div className="flex gap-3">
              <img
                src={
                      blog.image?.startsWith("http")
                        ? blog.image
                        : `${SERVER_URL}${blog.image}`
                    }
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{blog.title}</h3>
                <p className="text-sm opacity-70">{blog.category}</p>
                <p className="text-sm">By {blog.author}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {blog.tags?.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-1 rounded ${
                    dark
                      ? "bg-purple-700 text-purple-100"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-xs mt-2 opacity-70">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <div className="flex sm:hidden gap-2 mt-3">
              <button
                onClick={() => openEdit(blog)}
                className="flex-1 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(blog._id)}
                className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Blog</h3>

            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Title"
            />

            <input
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Category"
            />

            <input
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Author"
            />

            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
              rows={4}
            />

            <input
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
              placeholder="Tags (comma separated)"
            />

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
            />

            {formData.image && (
              <img src={formData.image} className="w-28 mt-3 rounded" />
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingBlog(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
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
