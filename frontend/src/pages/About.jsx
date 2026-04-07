import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";

const About = () => {
  // Get global dark mode from layout
  const { dark } = useOutletContext();

  return (
    <div
      className={`py-25 px-6 md:px-20 transition-colors duration-500 text-black ${dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-black"} dark:text-gray-200`}
    >
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">
          About <span className="text-[#8F00FF]">Neurocelix</span>
        </h1>
        <p
          className={`max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`}
        >
          We build AI-powered automation systems and scalable digital solutions
          to help businesses grow smarter and faster.
        </p>
      </motion.div>

      {/* MISSION & VISION */}
      <div className="grid md:grid-cols-2 gap-10 mb-20">
        {[
          {
            title: "Our Mission",
            text: "To empower organizations with intelligent automation and data-driven solutions that reduce complexity and maximize impact.",
          },
          {
            title: "Our Vision",
            text: "To become a global leader in AI innovation by delivering transformative digital experiences that shape the future.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-10 rounded-2xl shadow-lg transition duration-300 border 
              ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#8F00FF]">
              {item.title}
            </h2>
            <p className={dark ? "text-gray-300" : "text-gray-600"}>
              {item.text}
            </p>
          </motion.div>
        ))}
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
              <div className="text-[#8F00FF] font-bold text-xl">
                {item.year}
              </div>
              <div
                className={`flex-1 border-l-2 pl-6 ${
                  dark
                    ? "border-[#8F00FF] text-gray-300"
                    : "border-[#8F00FF] text-gray-600"
                }`}
              >
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
                whileHover={{ y: -10, scale: 1.03 }}
                className={`p-8 rounded-2xl shadow-lg text-center transition duration-300
                  ${dark ? "bg-gray-800" : "bg-white"}`}
              >
                <h3
                  className={`text-xl font-semibold mb-2 ${dark ? "text-white" : "text-black"}`}
                >
                  Team Member
                </h3>
                <p className={dark ? "text-gray-400" : "text-gray-500"}>
                  {role}
                </p>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
