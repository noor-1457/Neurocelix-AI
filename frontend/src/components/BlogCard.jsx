import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = blog.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/blog/${slug}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow cursor-pointer"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="rounded-md w-full h-48 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
        {blog.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{blog.excerpt}</p>
      <span className="text-sm text-gray-500">{blog.category}</span>
    </motion.div>
  );
};
export default BlogCard;  