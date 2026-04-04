import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import ServiceTable from "../../components/dashboard/ServiceTable";
import { AuthContext } from "../../context/AuthContext";

import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  updateService,
  deleteService,
  resetServiceState,
  fetchServices,
} from "../../features/services/serviceSlice";

const Services = () => {
  const dispatch = useDispatch();
  const { services, loading, error, success } = useSelector(
    (state) => state.services,
  );

  const { dark } = useContext(AuthContext);

  const [editingService, setEditingService] = useState(null);
  const [addingService, setAddingService] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    icon: "",
    features: "",
  });

  // FETCH SERVICES
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // RESET STATE AFTER SUCCESS
  useEffect(() => {
    if (success) {
      dispatch(fetchServices());
      dispatch(resetServiceState());
      setEditingService(null);
      setAddingService(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        icon: "",
        features: "",
      });
    }
  }, [success, dispatch]);

  // DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Delete this service?")) return;
    dispatch(deleteService(id));
  };

  // EDIT OPEN
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category || "",
      icon: service.icon || "",
      features: service.features?.join(", ") || "",
    });
    setAddingService(true); // open modal
  };

  // ADD OR UPDATE
  const handleSubmit = () => {
    const payload = {
      ...formData,
      features: formData.features.split(",").map((f) => f.trim()),
    };

    if (editingService) {
      // UPDATE
      dispatch(updateService({ id: editingService._id, data: payload }));
    } else {
      // ADD
      dispatch(addService(payload));
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      <motion.div
        className={`p-4 md:p-6 rounded-xl shadow mb-4 ${
          dark ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold">Services</h1>

          {/* Add Service Button */}
          <button
            onClick={() => {
              setAddingService(true);
              setEditingService(null);
              setFormData({
                title: "",
                description: "",
                category: "",
                icon: "",
                features: "",
              });
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full sm:w-auto"
          >
            <Plus size={18} />
            Add Service
          </button>
        </div>
      </motion.div>

      <ServiceTable
        services={services}
        handleDelete={(id) => dispatch(deleteService(id))}
        handleUpdate={(id, data) => dispatch(updateService({ id, data }))}
      />

      {/* MODAL */}
      {addingService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`bg-white p-6 rounded-xl w-full max-w-md ${
              dark ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-lg font-bold mb-4">
              {editingService ? "Edit Service" : "Add Service"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              type="text"
              placeholder="Icon"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              type="text"
              placeholder="Features (comma separated)"
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            />

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setAddingService(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              >
                {editingService ? "Save Changes" : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
