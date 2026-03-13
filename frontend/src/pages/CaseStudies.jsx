import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const CaseStudies = () => {
  const { dark } = useOutletContext(); // get dark mode from layout
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/casestudies")
      .then((res) => {
        setCaseStudies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen transition-colors duration-500 ${
          dark ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
        }`}
      >
        <h1 className="text-xl font-semibold animate-pulse">
          Loading Case Studies...
        </h1>
      </div>
    );
  }

  return (
    <div
      className={`pt-28 px-6 md:px-20 pb-10 min-h-screen transition-colors duration-500 ${
        dark ? "bg-gray-900" : "bg-gradient-to-br from-[#DDA0DD] to-[#8F00FF]"
      }`}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2
          className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Our Case Studies
        </h2>
        <p
          className={`max-w-2xl mx-auto transition-colors duration-300 ${
            dark ? "text-gray-300" : "text-black"
          }`}
        >
          Real-world success stories showcasing measurable business impact.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study._id}
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl shadow-lg border transition duration-300 ${
              dark
                ? "bg-gray-800 border-gray-700 hover:border-purple-500"
                : "bg-white border-gray-200 hover:border-pink-600"
            }`}
          >
            {/* Title */}
            <h3
              className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                dark ? "text-white" : "text-gray-800"
              }`}
            >
              {study.title}
            </h3>

            {/* Category */}
            <p
              className={`text-sm font-medium mb-1 transition-colors duration-300 ${
                dark ? "text-purple-400" : "text-purple-700"
              }`}
            >
              Category: {study.category}
            </p>

            {/* Client */}
            <p
              className={`text-sm mb-4 transition-colors duration-300 ${
                dark ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Client: {study.client}
            </p>

            {/* Description */}
            <p
              className={`text-sm mb-4 transition-colors duration-300 ${
                dark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {study.description}
            </p>

            {/* Results */}
            <div className="mb-4">
              <h4
                className={`font-semibold text-sm mb-2 transition-colors duration-300 ${
                  dark ? "text-white" : "text-gray-800"
                }`}
              >
                Key Results:
              </h4>
              <ul
                className={`list-disc list-inside text-sm space-y-1 transition-colors duration-300 ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {study.results?.map((result, i) => (
                  <li key={i}>{result}</li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {study.tags?.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors duration-300 ${
                    dark
                      ? "bg-purple-700 text-white"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
