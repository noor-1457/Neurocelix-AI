import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import ServiceTable from "../../components/dashboard/ServiceTable";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [addingService, setAddingService] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    icon: "",
    features: "",
  });

  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    } catch (err) {
      console.error(err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category || "",
      icon: service.icon || "",
      features: service.features ? service.features.join(", ") : "",
    });
  };
  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        features: formData.features.split(",").map((f) => f.trim()),
      };

      const res = await axios.put(
        `http://localhost:5000/api/services/${editingService._id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setServices((prev) =>
        prev.map((s) => (s._id === res.data._id ? res.data : s)),
      );

      setEditingService(null);
    } catch (err) {
      console.error(err);
    }
  };
  const handleAdd = async () => {
    try {
      const payload = {
        ...formData,
        features: formData.features.split(",").map((f) => f.trim()),
      };
      const res = await axios.post(
        `http://localhost:5000/api/services`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setServices((prev) => [res.data, ...prev]);
      setAddingService(false);

      setFormData({
        title: "",
        description: "",
        category: "",
        icon: "",
        features: "",
      });
    } catch (err) {
      console.error(err);
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
    <>
      {/* Header with Add button */}
      <motion.div
        className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-lg md:text-2xl font-bold dark:text-white">
          Services
        </h1>
        <button
          onClick={() => setAddingService(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          Add Service
        </button>
      </motion.div>

      {/* Service Table */}
      <ServiceTable
        services={services}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Edit Service
            </h3>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Icon (e.g. Smartphone)"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />

            <input
              type="text"
              placeholder="Features (comma separated)"
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full mb-4 px-3 py-2 border rounded-md"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingService(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {addingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Add Service
            </h3>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Icon (e.g. Smartphone)"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />

            <input
              type="text"
              placeholder="Features (comma separated)"
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full mb-4 px-3 py-2 border rounded-md"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setAddingService(false);
                  setFormData({ title: "", category: "", description: "" });
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
