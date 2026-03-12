import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-xl font-semibold mb-4">Contacts</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact._id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-3">{contact.name}</td>
                <td className="p-3">{contact.email}</td>
                <td className="p-3">{contact.phone || "-"}</td>
                <td className="p-3">{contact.subject}</td>
                <td className="p-3">
                  <select
                    value={contact.status}
                    onChange={(e) =>
                      handleStatusChange(contact._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </td>
                <td className="p-3">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {contacts.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No contacts found</p>
        )}
      </div>
    </motion.div>
  );
};

export default ContactTable;
