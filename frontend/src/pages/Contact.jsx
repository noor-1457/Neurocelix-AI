import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Mail, Phone, User, MapPin, Clock } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const Contact = () => {
  const { dark } = useOutletContext(); // global dark mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
      );
      if (res.status === 201) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

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
    <div
      className={`min-h-screen py-24 px-6 transition-colors duration-300 ${dark ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <h1
            className={`text-4xl font-bold transition-colors ${dark ? "text-white" : "text-gray-900"}`}
          >
            Let's Talk 👋
          </h1>
          <p
            className={`text-gray-600 transition-colors ${dark ? "dark:text-gray-300" : ""}`}
          >
            Have a project idea or need help with development? Our team is ready
            to help you build something amazing.
          </p>

          <div className="space-y-4">
            {contactInfo.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-xl shadow hover:shadow-lg transition transform ${dark ? "bg-gray-800" : "bg-white"}`}
              >
                <div className={`p-3 rounded-lg ${item.bg}`}>{item.icon}</div>
                <div>
                  <p
                    className={`font-semibold transition-colors ${dark ? "text-white" : "text-gray-800"}`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`text-sm transition-colors ${dark ? "text-gray-300" : "text-gray-500"}`}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-10 rounded-2xl shadow-2xl transition-colors ${dark ? "bg-gray-800" : "bg-white"}`}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center border rounded-lg overflow-hidden dark:border-gray-600">
              <User className="ml-3 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 outline-none transition-colors ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
              />
            </div>

            <div className="flex items-center border rounded-lg overflow-hidden dark:border-gray-600">
              <Mail className="ml-3 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 outline-none transition-colors ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
              />
            </div>

            <div className="flex items-center border rounded-lg overflow-hidden dark:border-gray-600">
              <Phone className="ml-3 text-gray-400" size={18} />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-3 outline-none transition-colors ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border transition-colors ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border transition-colors ${dark ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105"
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
