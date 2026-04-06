import { motion } from "framer-motion";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCaseStudies } from ".././features/caseStudies/caseStudySlice";

const CaseStudies = () => {
  const { dark } = useOutletContext();

  const dispatch = useDispatch();

  const { caseStudies, loading } = useSelector((state) => state.caseStudies);

  useEffect(() => {
    dispatch(fetchCaseStudies());
  }, [dispatch]);

  /* ========= LOADING ========= */

  if (loading) {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-screen gap-3 ${
          dark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
      >
        <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm">Loading...</p>
      </div>
    );
  }

  /* ========= UI ========= */

  return (
    <div
      className={`pt-28 px-6 md:px-20 pb-10 min-h-screen transition-colors duration-500 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-50"
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
        <h2 className="text-4xl font-bold mb-4">Our Case Studies</h2>

        <p className="max-w-2xl mx-auto">
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
            className={`p-8 rounded-2xl shadow-lg border ${
              dark
                ? "bg-gray-800 border-gray-700 hover:border-purple-500"
                : "bg-white border-gray-200 hover:border-pink-600"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{study.title}</h3>

            <p className="text-sm font-medium mb-1">
              Category: {study.category}
            </p>

            <p className="text-sm mb-4">Client: {study.client}</p>

            <p className="text-sm mb-4">{study.description}</p>

            {/* Results */}
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Key Results:</h4>

              <ul className="list-disc list-inside text-sm space-y-1">
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
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
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
