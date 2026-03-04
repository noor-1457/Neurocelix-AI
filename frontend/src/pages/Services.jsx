import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => {
        setServices(res.data); // because API returns array directly
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
    <div className="pt-28 px-6 md:px-20 bg-gradient-to-br from-[#DDA0DD] to-[#8F00FF] pb-4 min-h-screen">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16"
      >
        Our Professional Services
      </motion.h1>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border"
          >
            {/* Icon */}
            <div className="text-4xl mb-4">{service.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>

            {/* Description */}
            <p className="text-gray-600 mb-4">{service.description}</p>

            {/* Features */}
            <ul className="space-y-2">
              {service.features.map((feature, i) => (
                <li
                  key={i}
                  className="text-gray-600 text-sm flex items-center gap-2"
                >
                  ✔ {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
