import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Calendar, User, Tag, MessageCircle } from "lucide-react";

const BlogDetail = () => {
  const { dark } = useOutletContext(); // global dark mode
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
      const data = await res.json();
      setBlog(data);
      setCommentsList(data.comments || []);
    } catch (error) {
      console.log("Error fetching blog", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    const newComment = { name: "Guest", email: "guest@example.com", comment };

    try {
      const res = await fetch(
        `http://localhost:5000/api/blogs/${id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newComment),
        },
      );
      const data = await res.json();
      setCommentsList(data.comments);
      setComment("");
    } catch (error) {
      console.log("Error adding comment", error);
    }
  };

  if (!blog)
    return (
      <p
        className={`text-center mt-20 text-xl transition-colors duration-300 ${
          dark ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Loading...
      </p>
    );

  const date = new Date(blog.createdAt).toLocaleDateString();

  return (
    <div
      className={`min-h-screen py-24 px-4 transition-colors duration-300 ${
        dark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`max-w-4xl mx-auto rounded-xl shadow-xl p-8 relative transition-colors duration-300 ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-300 ${
            dark
              ? "bg-gray-700 hover:bg-red-500 hover:text-white"
              : "bg-gray-200 hover:bg-red-500 hover:text-white"
          }`}
        >
          <X size={20} />
        </button>

        {/* Image */}
        <img
          src={
            blog.image
          }
          alt={blog.title}
<<<<<<< Updated upstream
          className="rounded-lg w-full h-80 object-start mb-6"
=======
          className="rounded-lg w-full h-64 object-cover mb-6 shadow-lg"
>>>>>>> Stashed changes
        />

        {/* Category Badge */}
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full">
          {blog.category}
        </span>

        {/* Title */}
        <h1
          className={`text-3xl font-bold mt-4 mb-4 transition-colors duration-300 ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          {blog.title}
        </h1>

        {/* Author + Date + Comments */}
        <div
          className={`flex flex-wrap gap-6 text-sm mb-6 transition-colors duration-300 ${dark ? "text-gray-300" : "text-gray-500"}`}
        >
          <div className="flex items-center gap-2">
            <User size={16} />
            {blog.author}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {date}
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle size={16} />
            {commentsList.length} Comments
          </div>
        </div>

        {/* Content */}
        <p
          className={`leading-relaxed whitespace-pre-line transition-colors duration-300 ${
            dark ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {blog.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full transition-colors duration-300 ${
                dark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-700"
              }`}
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <h2
            className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            Comments
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              className={`w-full p-3 rounded-md border transition-colors duration-300 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                dark
                  ? "border-gray-700 bg-gray-700 text-white placeholder-gray-400"
                  : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Add your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-transform transform hover:scale-105">
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {commentsList.length === 0 && (
              <p className="transition-colors duration-300 text-gray-500 dark:text-gray-300">
                No comments yet.
              </p>
            )}

            {commentsList.map((c, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg transition-colors duration-300 ${
                  dark
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm">{c.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetail;
