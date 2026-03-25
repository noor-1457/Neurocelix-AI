import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ContactTable from "../../components/dashboard/ContactTable";
import { AuthContext } from "../../context/AuthContext";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const { dark } = useContext(AuthContext);
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

      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <motion.div
      className={`p-4 md:p-6 rounded-xl shadow transition-colors
        ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2
        className={`text-lg md:text-xl font-semibold mb-4 ${dark ? "text-white" : "text-gray-900"}`}
      >
        Contacts
      </h2>

      {/* Contact Table */}
      <ContactTable
        contacts={contacts}
        handleDelete={handleDelete}
        dark={dark}
      />
    </motion.div>
  );
};

export default Contact;
