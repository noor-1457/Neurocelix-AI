import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const CaseStudies = () => {
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
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold animate-pulse">
          Loading Case Studies...
        </h1>
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 md:px-20 bg-gradient-to-br from-[#DDA0DD] to-[#8F00FF] pb-4 min-h-screen">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Our Case Studies</h2>
        <p className="max-w-2xl mx-auto text-black">
          Real-world success stories showcasing measurable business impact.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-10">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition duration-300"
          >
            {/* Title */}
            <h3 className="text-xl font-semibold mb-2 text-black">
              {study.title}
            </h3>

            {/* Category */}
            <p className="text-sm text-[#8F00FF] font-medium mb-2">
              Category: {study.category}
            </p>

            {/* Client */}
            <p className="text-sm text-gray-500 mb-4">Client: {study.client}</p>

            {/* Description */}
            <p className="text-gray-600">{study.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
