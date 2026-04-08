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
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full sm:w-auto"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
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

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
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
              className="mb-3 w-full text-sm"
            />

            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mb-3"
              />
            )}

            <div className="flex flex-col sm:flex-row justify-end gap-2">
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