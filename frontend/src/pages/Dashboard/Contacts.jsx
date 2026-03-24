import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ContactTable from "../../components/dashboard/ContactTable";


const Contact = () => {
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
      className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-lg md:text-xl font-semibold mb-4 dark:text-white">
        Contacts
      </h2>

      <ContactTable
        contacts={contacts}
        handleDelete={handleDelete}
      />
    </motion.div>
  );
};

export default Contact;