import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Calendar, User, Tag, MessageCircle } from "lucide-react";

const BlogDetail = () => {
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

    const newComment = {
      name: "Guest",
      email: "guest@example.com",
      comment: comment,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/blogs/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
      <p className="text-center mt-20 text-gray-500 dark:text-gray-300">
        Loading...
      </p>
    );

  const date = new Date(blog.createdAt).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-24 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 relative"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-red-500 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <img
          src={
            blog.image
          }
          alt={blog.title}
          className="rounded-lg w-full h-80 object-start mb-6"
        />

        {/* Category */}
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full">
          {blog.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl font-bold mt-4 mb-4 text-gray-900 dark:text-white">
          {blog.title}
        </h1>

        {/* Author + Date */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-300 mb-6">
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
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {blog.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Comments
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white mb-3"
              placeholder="Add your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
            >
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {commentsList.length === 0 && (
              <p className="text-gray-500">No comments yet.</p>
            )}

            {commentsList.map((c, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
              >
                <p className="font-semibold text-gray-800 dark:text-white">
                  {c.name}
                </p>
                <p className="text-gray-600 dark:text-gray-300">{c.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetail;
