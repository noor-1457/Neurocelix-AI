import React from "react";
import { Trash2 } from "lucide-react";

const ContactTable = ({ contacts, handleDelete, dark }) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr
              className={`text-left ${dark ? "text-gray-300" : "text-gray-600"}`}
            >
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Created</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className={`shadow-sm rounded-lg transition-colors
                    ${dark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-gray-900 hover:bg-gray-100"}`}
                >
                  <td className="p-4 font-bold rounded-l-lg">{contact.name}</td>
                  <td
                    className={`p-4 ${dark ? "text-gray-200" : "text-gray-700"}`}
                  >
                    {contact.email}
                  </td>
                  <td className="p-4">{contact.phone || "-"}</td>
                  <td className="p-4">{contact.subject}</td>
                  <td
                    className={`p-4 ${dark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center rounded-r-lg">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className={`transition-colors ${
                        dark
                          ? "text-red-400 hover:text-red-500"
                          : "text-red-500 hover:text-red-600"
                      }`}
                    >
                      <Trash2 size={22} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className={`text-center p-4 ${dark ? "text-gray-400" : "text-gray-500"}`}
                >
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className={`rounded-lg p-4 shadow transition-colors
                ${dark ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
            >
              <h3 className="font-semibold">{contact.name}</h3>
              <p
                className={`${dark ? "text-gray-200" : "text-gray-500"} text-sm`}
              >
                {contact.email}
              </p>
              <p
                className={`${dark ? "text-gray-200" : "text-gray-500"} text-sm`}
              >
                {contact.phone || "-"}
              </p>
              <p
                className={`${dark ? "text-gray-300" : "text-gray-600"} text-sm mt-1`}
              >
                {contact.subject}
              </p>
              <p
                className={`${dark ? "text-gray-400" : "text-gray-400"} text-xs mt-2`}
              >
                {new Date(contact.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(contact._id)}
                className="mt-3 w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p
            className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}
          >
            No contacts found
          </p>
        )}
      </div>
    </>
  );
};

export default ContactTable;
