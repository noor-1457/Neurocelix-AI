import React from "react";

const BlogTable = ({ blogs = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-xl p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Blogs
      </h2>

      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-200">Image</th>
            <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-200">Title</th>
            <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-200">Category</th>
            <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-200">Author</th>
            <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-200">Created</th>
            <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-200">Action</th>
          </tr>
        </thead>

        <tbody>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <tr
                key={blog._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-4 py-3">
                  <img
                    src={blog.image || "https://via.placeholder.com/50"}
                    alt={blog.title}
                    className="w-12 h-12 rounded-lg object-cover border"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{blog.title}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{blog.category}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{blog.author}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => onEdit(blog)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(blog._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-300">
                No blogs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;