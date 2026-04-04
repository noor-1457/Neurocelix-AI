import React, { useEffect, useState, useContext } from "react";
import { Plus } from "lucide-react";
import CaseStudiesTable from "../../components/dashboard/CaseStudiesTable";
import { AuthContext } from "../../context/AuthContext";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCaseStudies,
  addCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from "../../features/caseStudies/caseStudySlice";

const CaseStudiesDashboard = () => {
  const dispatch = useDispatch();

  const { caseStudies, loading } = useSelector((state) => state.caseStudies);

  const { dark } = useContext(AuthContext);

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

  // FETCH
  useEffect(() => {
    dispatch(fetchCaseStudies());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  // SUBMIT
  const handleSubmit = (e) => {
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

    if (editingId) {
      dispatch(updateCaseStudy({ id: editingId, data: payload }));
    } else {
      dispatch(addCaseStudy(payload));
    }

    setOpenModal(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this case study?")) return;
    dispatch(deleteCaseStudy(id));
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className={`md:p-6 ${dark ? "bg-gray-900 text-white" : ""}`}>
      {/* HEADER */}
      <div className="p-4 md:p-6 rounded-xl shadow mb-4 bg-white flex justify-between">
        <h1 className="text-2xl font-bold">Case Studies</h1>

        <button
          onClick={openAddModal}
          className="flex gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          <Plus size={18} /> Add Case Study
        </button>
      </div>

      <CaseStudiesTable
        caseStudies={caseStudies}
        openEditModal={openEditModal}
        deleteCaseStudy={handleDelete}
        dark={dark}
      />

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            className={`rounded-xl shadow-lg p-6 w-full max-w-lg ${
              dark ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Case Study" : "Add Case Study"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border p-2 rounded"
              />

              <input
                name="client"
                value={formData.client}
                onChange={handleChange}
                placeholder="Client"
                className="w-full border p-2 rounded"
              />

              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full border p-2 rounded"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border p-2 rounded"
              />

              <input
                name="results"
                value={formData.results}
                onChange={handleChange}
                placeholder="Results (comma separated)"
                className="w-full border p-2 rounded"
              />

              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Tags (comma separated)"
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                >
                  {editingId ? "Update" : "Add"}
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
