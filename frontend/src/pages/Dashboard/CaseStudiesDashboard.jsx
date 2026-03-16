import React, { useEffect, useState } from "react";
import axios from "axios";
import { SquarePen, Trash2, Plus } from "lucide-react";

const CaseStudiesDashboard = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    category: "",
    results: "",
    tags: "",
  });

  const token = localStorage.getItem("token");

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/casestudies");
      setCaseStudies(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      client: "",
      category: "",
      results: "",
      tags: "",
    });
    setOpenModal(true);
  };

  const openEditModal = (study) => {
    setEditingId(study._id);

    setFormData({
      title: study.title || "",
      description: study.description || "",
      client: study.client || "",
      category: study.category || "",
      results: study.results?.join(", ") || "",
      tags: study.tags?.join(", ") || "",
    });

    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      client: formData.client,
      category: formData.category,
      results: formData.results
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),

      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/casestudies/${editingId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } else {
        await axios.post("http://localhost:5000/api/casestudies", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setOpenModal(false);
      fetchCaseStudies();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCaseStudy = async (id) => {
    if (!window.confirm("Delete this case study?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/casestudies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCaseStudies();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-14 h-14 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Case Studies</h1>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus size={18} />
          Add Case Study
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-purple-300 text-black text-sm">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Client</th>
              <th className="p-4">Category</th>
              <th className="p-4">Results</th>
              <th className="p-4">Tags</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {caseStudies.map((study) => (
              <tr key={study._id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{study.title}</td>

                <td className="p-4 font-medium text-nowrap text-gray-600">{study.client}</td>

                <td className="p-4">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                    {study.category}
                  </span>
                </td>

                <td className="p-4">
                  {study.results?.slice(0, 2).map((r, i) => (
                    <div key={i} className="text-sm text-gray-600">
                      • {r}
                    </div>
                  ))}
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {study.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="p-4 flex gap-3 justify-center">
                  <button
                    onClick={() => openEditModal(study)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <SquarePen size={22} />
                  </button>

                  <button
                    onClick={() => deleteCaseStudy(study._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-130 shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
      {editingId ? "Edit Case Study" : "Add Case Study"}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border-gray-300 dark:border-gray-600 border p-2 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border-gray-300 dark:border-gray-600 border p-2 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
        required
      />

      <input
        name="client"
        placeholder="Client"
        value={formData.client}
        onChange={handleChange}
        className="w-full border-gray-300 dark:border-gray-600 border p-2 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border-gray-300 dark:border-gray-600 border p-2 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
      />

      <input
        name="results"
        placeholder="Results (comma separated)"
        value={formData.results}
        onChange={handleChange}
        className="w-full border-gray-300 dark:border-gray-600 border p-2 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
      />

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={handleChange}
        className="w-full border-gray-300 dark:border-gray-600 border p-2 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
      />

      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={() => setOpenModal(false)}
          className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 active:scale-95 transition-transform"
        >
          {editingId ? "Update" : "Create"}
        </button>
      </div>
    </form>
  </div>
</div>
      )}
    </div>
  );
};

export default CaseStudiesDashboard;
