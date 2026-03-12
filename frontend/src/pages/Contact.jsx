import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Mail,
  Phone,
  User,
  MapPin,
  Clock,
} from "lucide-react";

const Contact = () => {
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Let's Talk 👋
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            Have a project idea or need help with development?  
            Our team is ready to help you build something amazing.
          </p>

          {/* Contact Cards */}

          <div className="space-y-4">

            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Mail className="text-blue-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Email Us
                </p>
                <p className="text-sm text-gray-500">
                  support@yourcompany.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Phone className="text-purple-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Call Us
                </p>
                <p className="text-sm text-gray-500">
                  +92 300 0000000
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
              <div className="p-3 bg-green-100 rounded-lg">
                <MapPin className="text-green-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Location
                </p>
                <p className="text-sm text-gray-500">
                  Pakistan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Working Hours
                </p>
                <p className="text-sm text-gray-500">
                  Mon - Fri : 9AM - 6PM
                </p>
              </div>
            </div>

          </div>
        </motion.div>


        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10"
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
                className="w-full p-3 outline-none dark:bg-gray-800 dark:text-white"
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
                className="w-full p-3 outline-none dark:bg-gray-800 dark:text-white"
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
                className="w-full p-3 outline-none dark:bg-gray-800 dark:text-white"
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white py-3 rounded-lg font-semibold transition"
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