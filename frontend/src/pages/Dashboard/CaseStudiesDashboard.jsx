import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import CaseStudiesTable from "../../components/dashboard/CaseStudiesTable";

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
          }
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
    <div className="md:p-6">

  {/* Header */}
  <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
    
    <h1 className="text-xl md:text-2xl font-bold">Case Studies</h1>

    <button
      onClick={openAddModal}
      className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full sm:w-auto"
    >
      <Plus size={18} />
      Add Case Study
    </button>

  </div>

  {/* Table Component */}
  <div className="overflow-x-auto">
    <CaseStudiesTable
      caseStudies={caseStudies}
      openEditModal={openEditModal}
      deleteCaseStudy={deleteCaseStudy}
    />
  </div>

  {/* Modal */}
  {openModal && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      
      <div className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-xl w-full max-w-lg shadow-lg">

        <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {editingId ? "Edit Case Study" : "Add Case Study"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="client"
            placeholder="Client"
            value={formData.client}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="results"
            placeholder="Results (comma separated)"
            value={formData.results}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="px-4 py-2 border rounded w-full sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 w-full sm:w-auto"
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