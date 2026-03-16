import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { SquarePen, Trash2, } from "lucide-react";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContacts();
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/contact/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchContacts();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

 return (
  <motion.div
    className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h2 className="text-lg md:text-xl font-semibold mb-4 dark:text-white">
      Contacts
    </h2>

    {/* Desktop Table */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Created</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr
                key={contact._id}
                className="dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-4 font-bold">{contact.name}</td>
                <td className="py-4 text-gray-700">{contact.email}</td>
                <td className="py-4">{contact.phone || "-"}</td>
                <td className="py-4">{contact.subject}</td>
                <td className="py-4">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3">
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

    {/* Mobile Cards */}
    <div className="grid gap-4 md:hidden">

      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <div
            key={contact._id}
            className="border dark:border-gray-700 rounded-lg p-4 shadow-sm"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {contact.name}
            </h3>

            <p className="text-sm text-gray-500">
              {contact.email}
            </p>

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
  </motion.div>
);
};

export default ContactTable;
