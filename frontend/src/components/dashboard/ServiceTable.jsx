import React, { useState, useContext } from "react";
import { SquarePen, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

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
  const { dark } = useContext(AuthContext); // 🔥 get dark mode from context

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
          { headers: { Authorization: `Bearer ${token}` } },
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
      {/* Desktop Table */}
      <div
        className={`hidden md:block overflow-x-auto rounded-xl shadow transition-colors
          ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
      >
        <table className="w-full">
          <thead
            className={`${dark ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-600"}`}
          >
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
                  className={`border-t transition-colors
                    ${dark ? "border-purple-700 hover:bg-purple-700" : "border-gray-200 hover:bg-gray-50"}`}
                >
                  <td className="p-4 font-medium">{service.title}</td>
                  <td className="p-4">{service.category}</td>
                  <td
                    className={`p-4 text-sm ${dark ? "text-gray-200" : "text-gray-500"}`}
                  >
                    {service.icon}
                  </td>
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
                  <td
                    className={`p-4 text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {service.createdAt
                      ? new Date(service.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className={`p-2 transition-colors ${dark ? "text-blue-400 hover:text-blue-500" : "text-blue-600 hover:text-blue-800"}`}
                    >
                      <SquarePen size={20} />
                    </button>

                    <button
                      onClick={() => handleDelete(service._id)}
                      className={`p-2 transition-colors ${dark ? "text-red-400 hover:text-red-500" : "text-red-600 hover:text-red-800"}`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className={`text-center p-6 ${dark ? "text-gray-400" : "text-gray-500"}`}
                >
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
              className={`rounded-xl p-4 shadow transition-colors ${dark ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
            >
              <h3 className="font-semibold">{service.title}</h3>
              <p
                className={`${dark ? "text-gray-200" : "text-gray-500"} text-sm`}
              >
                {service.category}
              </p>
              <p
                className={`${dark ? "text-gray-300" : "text-gray-400"} text-xs mt-1`}
              >
                Icon: {service.icon}
              </p>

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

              <p
                className={`${dark ? "text-gray-400" : "text-gray-400"} text-xs mt-2`}
              >
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
          <p
            className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}
          >
            No services found
          </p>
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div
            className={`p-6 rounded-xl w-full max-w-md transition-colors ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
          >
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
              className={`w-full mb-2 px-3 py-2 border rounded-md ${dark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className={`w-full mb-2 px-3 py-2 border rounded-md ${dark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            />

            <input
              type="text"
              placeholder="Icon (e.g. Globe)"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className={`w-full mb-2 px-3 py-2 border rounded-md ${dark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`w-full mb-2 px-3 py-2 border rounded-md ${dark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            />

            <input
              type="text"
              placeholder="Features (comma separated)"
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              className={`w-full mb-3 px-3 py-2 border rounded-md ${dark ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
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
