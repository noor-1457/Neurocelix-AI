import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, User, MapPin, Clock } from "lucide-react";
import { useOutletContext } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  sendContactMessage,
  resetContactState,
} from ".././features/contact/contactSlice";

const Contact = () => {
  const { dark } = useOutletContext();

  const dispatch = useDispatch();

  const { loading, contacts, error, success } = useSelector(
  (state) => state.contacts
);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  /* ========= VALIDATION ========= */

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.subject.trim())
      newErrors.subject = "Subject required";

    if (!formData.message.trim())
      newErrors.message = "Message required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ========= INPUT CHANGE ========= */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ========= SUBMIT ========= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(sendContactMessage(formData));
  };

  /* ========= SUCCESS RESET ========= */

 useEffect(() => {
  if (success) {
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => dispatch(resetContactState()), 3000);
  }
}, [success, dispatch]);
  /* ========= CONTACT INFO ========= */

  const contactInfo = [
    {
      icon: <Mail className="text-blue-600" />,
      label: "Email Us",
      value: "support@yourcompany.com",
      bg: "bg-blue-100",
    },
    {
      icon: <Phone className="text-purple-600" />,
      label: "Call Us",
      value: "+92 300 0000000",
      bg: "bg-purple-100",
    },
    {
      icon: <MapPin className="text-green-600" />,
      label: "Location",
      value: "Pakistan",
      bg: "bg-green-100",
    },
    {
      icon: <Clock className="text-yellow-600" />,
      label: "Working Hours",
      value: "Mon - Fri: 9AM - 6PM",
      bg: "bg-yellow-100",
    },
  ];

  return (
    <div className={`min-h-screen py-24 px-6 ${dark ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className={`text-4xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>
            Let's Talk 👋
          </h1>

          <div className="space-y-4 mt-8">
            {contactInfo.map((item, idx) => (
              <div key={idx} className={`${dark ? "bg-gray-800" : "bg-white"} p-4 rounded-xl shadow flex gap-4`}>
                <div className={`p-3 rounded-lg ${item.bg}`}>{item.icon}</div>
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${dark ? "bg-gray-800" : "bg-white"} p-10 rounded-2xl shadow-2xl`}
        >
          <form onSubmit={handleSubmit} className="space-y-5">

            <input name="name" placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg" />

            <input name="email" placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg" />

            <input name="phone" placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg" />

            <input name="subject" placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg" />

            <textarea name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-green-500 text-center">
                Message sent successfully 🎉
              </p>
            )}

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;