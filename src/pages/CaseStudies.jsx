import { motion } from "framer-motion";

const caseStudies = [
  {
    id: 1,
    title: "AI Chatbot Automation",
    result: "Reduced customer response time by 70%",
    desc: "Developed an AI-powered chatbot that automated support queries and improved customer engagement.",
  },
  {
    id: 2,
    title: "E-Commerce Growth System",
    result: "Increased sales by 45%",
    desc: "Implemented smart product recommendations and automated email marketing funnels.",
  },
  {
    id: 3,
    title: "Cloud Migration Project",
    result: "Improved system speed by 60%",
    desc: "Migrated legacy infrastructure to scalable cloud architecture with enhanced security.",
  },
];

const CaseStudies = () => {
  return (
    <div className=" pt-22 md:px-20">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">
          Our <span className="text-[#800000]">Case Studies</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Real-world success stories showcasing measurable business impact.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-10">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl shadow-lg border border-gray-200 bg-white"
          >
            <h3 className="text-xl font-semibold mb-3 text-black">
              {study.title}
            </h3>

            <p className="text-[#800000] font-medium mb-3">{study.result}</p>

            {/* CHANGED text-gray-300 → text-gray-600 */}
            <p className="text-gray-600">{study.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
