import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-xl font-semibold mb-4">Services</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr
                key={service._id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-3 font-semibold">{service.title}</td>
                <td className="p-3">{service.description}</td>
                <td className="p-3">
                  {new Date(service.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 flex space-x-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No services found</p>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceTable;