import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PublicServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => {
        setServices(res.data);
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
        <h1 className="text-2xl font-semibold animate-pulse">
          Loading Services...
        </h1>
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 md:px-20 bg-gradient-to-br from-[#DDA0DD] to-[#8F00FF] min-h-screen pb-20">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
      >
        Our Professional Services
      </motion.h1>

      {/* Services Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {services.map((service, index) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300"
          >
            
            {/* Category Badge */}
            <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              {service.category}
            </span>

            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center bg-purple-100 rounded-full text-2xl mt-4 mb-4">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-5 text-sm">
              {service.description}
            </p>

            {/* Features */}
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center text-gray-600 text-sm gap-2"
                >
                  <span className="text-purple-600 font-bold">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default PublicServices;