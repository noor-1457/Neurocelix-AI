import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const servicesData = [
  {
    id: 1,
    title: "AI Automation",
    desc: "Intelligent workflow automation powered by machine learning.",
  },
  {
    id: 2,
    title: "Web Development",
    desc: "Modern scalable web apps built with cutting-edge technologies.",
  },
  {
    id: 3,
    title: "Data Analytics",
    desc: "Advanced analytics to turn raw data into business insights.",
  },
  {
    id: 4,
    title: "Cloud Integration",
    desc: "Secure and scalable cloud architecture solutions.",
  },
];

const Services = () => {
  return (
    <div className="pt-28 px-6 md:px-20 pb-4">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">
          Our <span className="text-[#800000]">Services</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-600">
          We deliver intelligent digital solutions designed to accelerate
          innovation and drive business growth.
        </p>
      </motion.div>

      {/* SERVICES GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -12 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-2xl 
                       bg-white dark:bg-[#1a1a1a] 
                       shadow-lg border border-gray-200
                       overflow-hidden transition duration-300 text-white"
          >
            {/* Hover Maroon Overlay */}
            <div
              className="absolute inset-0 bg-[#800000] opacity-0 
                            group-hover:opacity-90 transition duration-500"
            ></div>

            <div
              className="relative z-10 transition duration-500 
                            group-hover:text-white"
            >
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>

              <p
                className="text-gray-600 dark:text-gray-300 
                            group-hover:text-white"
              >
                {service.desc}
              </p>

              <Link
                to={`/services/${service.id}`}
                className="inline-block mt-6 px-5 py-2 border 
                           border-gray-400 rounded-md
                           group-hover:bg-white 
                           group-hover:text-[#800000] 
                           transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-24 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">
          Ready to Transform Your Business?
        </h2>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="px-8 py-3 bg-[#800000] text-white 
                     rounded-md shadow-lg 
                     hover:bg-black transition duration-300"
        >
          Get Started Today
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Services;
