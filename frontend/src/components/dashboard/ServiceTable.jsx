import React, { useState } from "react";
import { SquarePen, Trash2, Plus } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const ServiceTable = ({ services = [], onUpdate, handleDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    icon: "",
    features: "",
  });

  const token = localStorage.getItem("token");

  // ─── Open Add
  const openAdd = () => {
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      icon: "",
      features: "",
    });
    setOpenModal(true);
  };

  // ─── Open Edit
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || "",
      description: service.description || "",
      category: service.category || "",
      icon: service.icon || "",
      features: service.features?.join(", ") || "",
    });
    setOpenModal(true);
  };

  // ─── Submit
  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f),
      };

      if (editingService) {
        const res = await axios.put(
          `${API_URL}/api/services/${editingService._id}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        onUpdate(res.data);
      } else {
        const res = await axios.post(`${API_URL}/api/services`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onUpdate(res.data);
      }

      setOpenModal(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Icon</th>
              <th className="p-4 text-left">Features</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.length > 0 ? (
              services.map((service) => (
                <tr
                  key={service._id}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4 font-medium">{service.title}</td>

                  <td className="p-4">{service.category}</td>

                  <td className="p-4 text-sm text-gray-500">{service.icon}</td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {service.features?.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-4 text-sm text-gray-500">
                    {service.createdAt
                      ? new Date(service.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <SquarePen size={20} />
                    </button>

                    <button
                      onClick={() => handleDelete(service._id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-500">
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="grid gap-4 md:hidden">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service._id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"
            >
              <h3 className="font-semibold">{service.title}</h3>

              <p className="text-sm text-gray-500">{service.category}</p>

              <p className="text-xs text-gray-400 mt-1">Icon: {service.icon}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {service.features?.map((f, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(service.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 py-2 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <SquarePen size={16} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(service._id)}
                  className="flex-1 py-2 bg-pink-500 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No services found</p>
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingService ? "Edit Service" : "Add Service"}
            </h3>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />

            <input
              type="text"
              placeholder="Icon (e.g. Globe)"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full mb-2 px-3 py-2 border rounded-md"
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

            <div className="flex gap-2">
              <button
                onClick={() => setOpenModal(false)}
                className="flex-1 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="flex-1 py-2 bg-purple-600 text-white rounded"
              >
                {editingService ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceTable;
