import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", category: "" });
  const token = localStorage.getItem("token");

  // ─── Fetch services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ─── Delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Failed to delete service.");
    }
  };

  // ─── Open edit modal
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category || "",
    });
  };

  // ─── Save edited service
  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/services/${editingService._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setServices((prev) =>
        prev.map((s) => (s._id === res.data._id ? res.data : s))
      );
      setEditingService(null);
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Failed to update service.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-3">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow overflow-x-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-xl font-semibold mb-4">Services</h2>

      <div className="min-w-[700px]">
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
            {services.length > 0 ? (
              services.map((service) => (
                <tr
                  key={service._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3 font-semibold max-w-xs truncate">{service.title}</td>
                  <td className="p-3 max-w-xs truncate">{service.description}</td>
                  <td className="p-3">{new Date(service.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleEdit(service)}
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
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Edit Service
            </h3>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded-md"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingService(null)}
                className="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceTable;