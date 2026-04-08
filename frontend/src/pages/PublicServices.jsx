import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CheckCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import api from "../api/api"; 

const PublicServices = () => {
  const { dark } = useOutletContext(); 
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchServices = async () => {
    try {
      const res = await api.get("/services"); 
      setServices(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchServices();
}, []);

  if (loading) {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-screen gap-3 transition-colors duration-300 ${
          dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
        }`}
      >
        <div className="w-15 h-15 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className={`${dark ? "text-gray-400" : "text-gray-500"} text-sm`}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`pt-28 px-6 md:px-20 min-h-screen pb-20 transition-colors duration-500 ${
        dark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
          dark ? "text-white" : "text-gray-800"
        }`}
      >
        Our Professional Services
      </motion.h1>

      {/* Services Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => {
          const Icon = Icons[service.icon];

          return (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`p-8 rounded-2xl shadow-lg transition duration-300 border ${
                dark
                  ? "bg-gray-800 border-gray-700 hover:border-purple-500"
                  : "bg-white border-gray-200 hover:border-pink-600"
              }`}
            >
              {/* Category Badge */}
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  dark
                    ? "bg-purple-700 text-white"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {service.category}
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full mt-4 mb-4 transition ${
                  dark ? "bg-purple-700" : "bg-purple-100"
                }`}
              >
                {Icon ? (
                  <Icon
                    size={40}
                    className={dark ? "text-white" : "text-pink-600"}
                  />
                ) : null}
              </div>

              {/* Title */}
              <h3
                className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                  dark ? "text-white" : "text-gray-800"
                }`}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className={`text-sm mb-5 transition-colors duration-300 ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-center text-sm gap-2 transition-colors duration-300 ${
                      dark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <CheckCircle
                      size={16}
                      className={dark ? "text-purple-400" : "text-purple-600"}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicServices;
