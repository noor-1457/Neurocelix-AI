import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
// import axios from "axios"; // Uncomment for real API
import { blogData } from "../blogData";

const BlogDetail = () => {
  const { slug } = useParams(); // Example: slug = 'how-ai-is-transforming-businesses'
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    // Fetch blog by slug from API
    // axios.get(`/api/blog/${slug}`).then(res => setBlog(res.data));

    // Using static data
    const found = blogData.find((b) =>
      b.title.toLowerCase().replace(/\s+/g, "-") === slug
    );
    setBlog(found);
  }, [slug]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    setCommentsList((prev) => [...prev, comment]);
    setComment("");
  };

  if (!blog) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-25 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-md w-full h-64 object-cover mb-6"
        />
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {blog.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{blog.excerpt}</p>
        <span className="text-sm text-gray-500 mb-8 block">{blog.category}</span>

        {/* Comment Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Comments
          </h2>
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white mb-2"
              placeholder="Add your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Submit
            </button>
          </form>

          <div className="space-y-4">
            {commentsList.length === 0 && <p className="text-gray-500">No comments yet.</p>}
            {commentsList.map((c, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md"
              >
                {c}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetail;