import React from "react";
import { SquarePen, Trash2 } from "lucide-react";

const CaseStudiesTable = ({
  caseStudies,
  openEditModal,
  deleteCaseStudy,
  dark,
}) => {
  return (
    <>
      {/* Desktop Table */}
      <div
        className={`hidden md:block overflow-x-auto rounded-xl shadow ${
          dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <table className="min-w-full border-collapse">
          <thead
            className={`${
              dark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-black"
            } text-sm`}
          >
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
              <tr
                key={study._id}
                className={`border-t ${
                  dark
                    ? "border-purple-700 hover:bg-purple-700 hover:text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="p-4 font-medium">{study.title}</td>

                <td
                  className={`p-4 whitespace-nowrap ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {study.client}
                </td>

                <td className="p-4">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                    {study.category}
                  </span>
                </td>

                <td
                  className={`p-4 ${dark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {study.results?.slice(0, 2).map((r, i) => (
                    <div key={i}>• {r}</div>
                  ))}
                </td>

                <td className="p-4 font-medium">
                  {study.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-1 mx-1 rounded ${
                        dark
                          ? "bg-purple-700 text-purple-100"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </td>

                <td className="p-4 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={() => openEditModal(study)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <SquarePen size={20} />
                    </button>

                    <button
                      onClick={() => deleteCaseStudy(study._id)}
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {caseStudies.map((study) => (
          <div
            key={study._id}
            className={`rounded-xl p-4 shadow space-y-2 ${
              dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h3 className="font-semibold text-lg">{study.title}</h3>

            <p
              className={`${dark ? "text-gray-300" : "text-gray-600"} text-sm`}
            >
              Client: {study.client}
            </p>

            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
              {study.category}
            </span>

            <div
              className={`${dark ? "text-gray-300" : "text-gray-600"} text-sm`}
            >
              {study.results?.slice(0, 2).map((r, i) => (
                <div key={i}>• {r}</div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {study.tags?.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-1 rounded ${
                    dark
                      ? "bg-purple-700 text-purple-100"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {tag}
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
    </>
  );
};

export default CaseStudiesTable;
