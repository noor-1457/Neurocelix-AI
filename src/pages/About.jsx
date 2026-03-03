import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="pt-28 px-6 md:px-20">
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">
          About <span className="text-[#800000]">Neurocelix</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-600">
          We build AI-powered automation systems and scalable digital solutions
          to help businesses grow smarter and faster.
        </p>
      </motion.div>

      {/* MISSION & VISION */}
      <div className="grid md:grid-cols-2 gap-10 mb-20">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-10 rounded-2xl shadow-lg bg-white dark:bg-[#1a1a1a]
                     transition duration-300 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#800000]">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            To empower organizations with intelligent automation and data-driven
            solutions that reduce complexity and maximize impact.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-10 rounded-2xl shadow-lg bg-white dark:bg-[#1a1a1a]
                     transition duration-300 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#800000]">
            Our Vision
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            To become a global leader in AI innovation by delivering
            transformative digital experiences that shape the future.
          </p>
        </motion.div>
      </div>

      {/* TIMELINE SECTION */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>

        <div className="space-y-10">
          {[
            {
              year: "2022",
              text: "Founded with a mission to simplify AI adoption.",
            },
            { year: "2023", text: "Launched first SaaS automation platform." },
            {
              year: "2024",
              text: "Expanded into enterprise digital transformation.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <div className="text-[#800000] font-bold text-xl">
                {item.year}
              </div>
              <div className="flex-1 border-l-2 border-[#800000] pl-6 text-gray-600 dark:text-gray-600">
                {item.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TEAM SECTION */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {["AI Engineer", "Frontend Developer", "Backend Specialist"].map(
            (role, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl shadow-lg bg-white dark:bg-[#1a1a1a]
                           text-center transition duration-300"
              >
                {/* <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 mb-6"></div> */}
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Team Member
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{role}</p>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
