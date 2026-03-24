import React from "react";
import { Trash2 } from "lucide-react";

const ContactTable = ({ contacts, handleDelete }) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-gray-600 dark:text-gray-300">
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
                  className="bg-white dark:bg-gray-700 shadow-sm rounded-lg"
                >
                  <td className="p-4 font-bold rounded-l-lg">
                    {contact.name}
                  </td>

                  <td className="p-4 text-gray-700 dark:text-gray-200">
                    {contact.email}
                  </td>

                  <td className="p-4">
                    {contact.phone || "-"}
                  </td>

                  <td className="p-4">
                    {contact.subject}
                  </td>

                  <td className="p-4 text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center rounded-r-lg">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={22} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (same as before) */}
      <div className="grid gap-4 md:hidden">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {contact.name}
              </h3>

              <p className="text-sm text-gray-500">{contact.email}</p>

              <p className="text-sm text-gray-500">
                {contact.phone || "-"}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {contact.subject}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(contact.createdAt).toLocaleDateString()}
              </p>

              <button
                onClick={() => handleDelete(contact._id)}
                className="mt-3 w-full py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No contacts found</p>
        )}
      </div>
    </>
  );
};

export default ContactTable;