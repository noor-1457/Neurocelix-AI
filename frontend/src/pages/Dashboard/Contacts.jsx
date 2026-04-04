import React, { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import ContactTable from "../../components/dashboard/ContactTable";
import { AuthContext } from "../../context/AuthContext";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContact,
} from "../../features/contact/contactSlice";

const Contact = () => {
  const { dark } = useContext(AuthContext);

  const dispatch = useDispatch();

  const { contacts, loading } = useSelector(
    (state) => state.contacts
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    dispatch(deleteContact(id));
  };

  if (loading)
    return <p className="text-center py-10">Loading...</p>;

  return (
    <motion.div
      className={`p-4 md:p-6 rounded-xl shadow transition-colors
        ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Contacts
      </h2>

      <ContactTable
        contacts={contacts}
        handleDelete={handleDelete}
        dark={dark}
      />
    </motion.div>
  );
};

export default Contact;