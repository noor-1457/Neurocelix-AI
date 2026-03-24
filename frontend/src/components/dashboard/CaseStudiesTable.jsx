import React from "react";
import { SquarePen, Trash2 } from "lucide-react";

const CaseStudiesTable = ({ caseStudies, openEditModal, deleteCaseStudy }) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-gray-100 text-black text-sm">
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
              <tr key={study._id} className="border-t">
                <td className="p-4 font-medium">{study.title}</td>

                <td className="p-4 text-gray-600 whitespace-nowrap">
                  {study.client}
                </td>

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
                    <SquarePen size={20} />
                  </button>

                  <button
                    onClick={() => deleteCaseStudy(study._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {caseStudies.map((study) => (
          <div
            key={study._id}
            className="bg-white shadow rounded-xl p-4 space-y-2"
          >
            <h3 className="font-semibold text-lg">{study.title}</h3>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Client:</span> {study.client}
            </p>

            <p>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                {study.category}
              </span>
            </p>

            <div className="text-sm text-gray-600">
              {study.results?.slice(0, 2).map((r, i) => (
                <div key={i}>• {r}</div>
              ))}
            </div>

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

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => openEditModal(study)}
                className="text-blue-600 hover:text-blue-800"
              >
                <SquarePen size={20} />
              </button>

              <button
                onClick={() => deleteCaseStudy(study._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CaseStudiesTable;