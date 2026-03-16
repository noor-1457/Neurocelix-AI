import React from "react";
import { SquarePen, Trash2, } from "lucide-react";

const BlogTable = ({ blogs = [], onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4">

      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Blogs
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
                    src={blog.image}
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

                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => onEdit(blog)}
                    className=" text-blue-600  hover:text-blue-700"
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
      <div className="grid gap-4 md:hidden">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border rounded-lg p-4 dark:border-gray-700"
          >
            <div className="flex gap-3 items-center">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-14 h-14 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {blog.category} • {blog.author}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onEdit(blog)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(blog._id)}
                className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md"
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
    </div>
  );
};

export default BlogTable;