import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";

const Pricing = () => {
  const { dark } = useOutletContext(); // global dark mode
  const [pricingPlans, setPricingPlans] = useState([]);
  const [isYearly, setIsYearly] = useState(false);
   const [loading, setLoading] = useState(true);

  const togglePricing = () => setIsYearly(!isYearly);

  // API Call
  useEffect(() => {
  const fetchPricing = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pricing");
      setPricingPlans(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchPricing();
}, []);
 if (loading) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen gap-3 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="w-15 h-15 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className={`${dark ? "text-gray-400" : "text-gray-500"} text-sm`}>
        Loading...
      </p>
    </div>
  );
}
  return (
    <div
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        dark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <h1
        className={`text-4xl font-bold text-center mb-8 transition-colors duration-300 ${
          dark ? "text-white" : "text-gray-900"
        }`}
      >
        Pricing Plans
      </h1>

      {/* Toggle */}
      <div className="flex justify-center mb-12 items-center">
        <span
          className={`mr-4 transition-colors ${dark ? "text-gray-300" : "text-gray-700"}`}
        >
          Monthly
        </span>

        <button
          onClick={togglePricing}
          className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors ${
            isYearly
              ? "bg-blue-600"
              : `bg-gray-300 ${dark ? "dark:bg-gray-700" : ""}`
          }`}
        >
          <span
            className={`inline-block w-6 h-6 transform bg-white rounded-full shadow-md transition-transform ${
              isYearly ? "translate-x-6" : "translate-x-0"
            }`}
          ></span>
        </button>

        <span
          className={`ml-4 transition-colors ${dark ? "text-gray-300" : "text-gray-700"}`}
        >
          Yearly
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan._id}
            className={`rounded-lg p-8 text-center shadow-lg hover:shadow-2xl cursor-pointer transition-transform transform ${
              plan.highlighted ? "scale-105 border-2 border-blue-600" : ""
            } ${dark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"}`}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>

            <p className="text-4xl font-extrabold mb-4">
              ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
            </p>

            <p className="text-gray-500 dark:text-gray-300 mb-6">
              {isYearly ? "per year" : "per month"}
            </p>

            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-transform transform hover:scale-105">
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>

      {/* Feature Table */}
      <div className="mt-16 max-w-5xl mx-auto overflow-x-auto">
        <table
          className={`min-w-full rounded-lg overflow-hidden transition-colors duration-300 ${
            dark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
          }`}
        >
          <thead>
            <tr
              className={`transition-colors duration-300 ${dark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}
            >
              <th className="py-3 px-6 text-left">Feature</th>
              {pricingPlans.map((plan) => (
                <th key={plan._id} className="py-3 px-6 text-center">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pricingPlans[0]?.features.map((feature, idx) => (
              <tr
                key={idx}
                className={`border-b transition-colors duration-300 ${
                  dark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <td className="py-3 px-6">{feature}</td>
                {pricingPlans.map((plan) => (
                  <td key={plan._id} className="py-3 px-6 text-center">
                    {plan.features[idx] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pricing;
