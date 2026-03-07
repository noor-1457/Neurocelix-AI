import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, MessageCircle, Tag } from "lucide-react";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${blog._id}`);
  };

  const date = new Date(blog.createdAt).toLocaleDateString();

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={
            blog.image ||
            "https://images.unsplash.com/photo-1677442136019-21780ecad995"
          }
          alt={blog.title}
          className="w-full h-52 object-cover"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full">
          {blog.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Author + Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-2">
            <User size={16} />
            {blog.author}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {date}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        {/* Comments */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MessageCircle size={16} />
          {blog.comments?.length || 0} Comments
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;