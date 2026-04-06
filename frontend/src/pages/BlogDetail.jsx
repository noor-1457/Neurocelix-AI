import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Calendar, User, Tag, MessageCircle } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, addComment } from ".././features/blogs/blogSlice";

const BlogDetail = () => {
  const { dark } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { selectedBlog: blog, loading } = useSelector((state) => state.blogs);

  /* ========= FETCH BLOG ========= */

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  /* ========= ADD COMMENT ========= */

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    await dispatch(
      addComment({
        id,
        comment: {
          name: "Guest",
          email: "guest@example.com",
          comment,
        },
      }),
    );

    setComment("");
  };

  /* ========= LOADING ========= */

  if (loading || !blog) {
    return (
      <p
        className={`text-center mt-20 text-xl ${
          dark ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Loading...
      </p>
    );
  }

  const date = new Date(blog.createdAt).toLocaleDateString();

  return (
    <div
      className={`min-h-screen py-24 px-4 ${
        dark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`max-w-4xl mx-auto rounded-xl shadow-xl p-8 relative ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Close */}
        <button
          onClick={() => navigate(-1)}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            dark
              ? "bg-gray-700 hover:bg-red-500"
              : "bg-gray-200 hover:bg-red-500"
          }`}
        >
          <X size={20} />
        </button>

        {/* Image */}
        <img
          src={
            blog.image?.startsWith("http")
              ? blog.image
              : `http://localhost:5000${blog.image}`
          }
          alt={blog.title}
          className="rounded-lg w-full h-64 object-cover mb-6"
        />

        {/* Category */}
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full">
          {blog.category}
        </span>

        {/* Title */}
        <h1
          className={`text-3xl font-bold mt-4 mb-4 ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          {blog.title}
        </h1>

        {/* Meta */}
        <div
          className={`flex flex-wrap gap-6 text-sm mb-6 ${
            dark ? "text-gray-300" : "text-gray-500"
          }`}
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
            {blog.comments?.length || 0} Comments
          </div>
        </div>

        {/* Content */}
        <p
          className={`leading-relaxed whitespace-pre-line ${
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
              className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full ${
                dark ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        {/* COMMENTS */}
        <div className="mt-12">
          <h2
            className={`text-2xl font-semibold mb-6 ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            Comments
          </h2>

          {/* Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              className={`w-full p-3 rounded-md border mb-3 ${
                dark
                  ? "border-gray-700 bg-gray-700 text-white"
                  : "border-gray-300 bg-white"
              }`}
              placeholder="Add your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
              Post Comment
            </button>
          </form>

          {/* List */}
          <div className="space-y-4">
            {blog.comments?.length === 0 && <p>No comments yet.</p>}

            {blog.comments?.map((c, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  dark ? "bg-gray-700" : "bg-gray-100"
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
