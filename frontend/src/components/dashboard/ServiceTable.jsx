import React, { useState, useContext } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const ServiceTable = ({
  services = [],
  handleDelete,
  handleUpdate, // 👈 parent dispatch karega
}) => {
  const { dark } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    icon: "",
    features: "",
  });

  // ─── OPEN EDIT
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
  const confirmDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this service?");
    if (!ok) return;

    handleDelete(id);
  };

  // ─── SUBMIT UPDATE
  const handleSubmit = () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      icon: formData.icon,
      features: formData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    handleUpdate(editingService._id, payload);

    setOpenModal(false);
  };

  return (
    <>
      {/* ================= DESKTOP TABLE ================= */}
      <div
        className={`hidden md:block overflow-x-auto rounded-xl shadow
        ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
      >
        <table className="w-full">
          <thead
            className={
              dark ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-600"
            }
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
            {services.map((service) => (
              <tr
                key={service._id}
                className={`border-t ${
                  dark
                    ? "border-purple-700 hover:bg-purple-700"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <td className="p-4 font-medium">{service.title}</td>
                <td className="p-4">{service.category}</td>
                <td className="p-4 text-sm">{service.icon}</td>

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

                <td className="p-4 text-sm">
                  {service.createdAt
                    ? new Date(service.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <SquarePen size={20} />
                    </button>

                    <button
                      onClick={() => confirmDelete(service._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="grid gap-4 md:hidden">
        {services.map((service) => (
          <div
            key={service._id}
            className={`rounded-xl p-4 shadow ${
              dark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h3 className="font-semibold">{service.title}</h3>
            <p className="text-sm">{service.category}</p>

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

            <div className="flex sm:hidden gap-2 mt-3">
              <button
                onClick={() => openEdit(blog)}
                className="flex-1 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(blog._id)}
                className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div
            className={`p-6 rounded-xl w-full max-w-md
            ${dark ? "bg-gray-800 text-white" : "bg-white"}`}
          >
            <h3 className="text-lg font-semibold mb-4">Edit Service</h3>

            {["title", "category", "icon"].map((field) => (
              <input
                key={field}
                placeholder={field}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field]: e.target.value,
                  })
                }
                className="w-full mb-2 px-3 py-2 border rounded"
              />
            ))}

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <input
              placeholder="Features (comma separated)"
              value={formData.features}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  features: e.target.value,
                })
              }
              className="w-full mb-3 px-3 py-2 border rounded"
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
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceTable;
