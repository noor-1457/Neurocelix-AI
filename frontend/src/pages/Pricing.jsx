import React, { useState } from "react";
// import { pricingPlans } from "./pricingData";
import { motion } from "framer-motion";

const Pricing = () => {
   const pricingPlans = [
  {
    id: 1,
    name: "Basic",
    monthly: 29,
    yearly: 290,
    features: ["1 Project", "5 GB Storage", "Basic Support"],
  },
  {
    id: 2,
    name: "Pro",
    monthly: 59,
    yearly: 590,
    features: ["10 Projects", "50 GB Storage", "Priority Support"],
  },
  {
    id: 3,
    name: "Enterprise",
    monthly: 99,
    yearly: 990,
    features: ["Unlimited Projects", "500 GB Storage", "24/7 Support"],
  },
];
  const [isYearly, setIsYearly] = useState(false);

  const togglePricing = () => setIsYearly(!isYearly);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Pricing Plans
      </h1>

      {/* Toggle Monthly / Yearly */}
      <div className="flex justify-center mb-12">
        <span className="mr-4 text-gray-700 dark:text-gray-300">Monthly</span>
        <button
          onClick={togglePricing}
          className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors ${
            isYearly ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
          }`}
        >
          <span
            className={`inline-block w-6 h-6 transform bg-white rounded-full shadow-md transition-transform ${
              isYearly ? "translate-x-6" : "translate-x-0"
            }`}
          ></span>
        </button>
        <span className="ml-4 text-gray-700 dark:text-gray-300">Yearly</span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center hover:shadow-2xl transition-shadow cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {plan.name}
            </h2>
            <p className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
              ${isYearly ? plan.yearly : plan.monthly}
            </p>
            <p className="text-gray-500 dark:text-gray-300 mb-6">
              {isYearly ? "per year" : "per month"}
            </p>

            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-200">
                  {feature}
                </li>
              ))}
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="mt-16 max-w-5xl mx-auto overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              <th className="py-3 px-6 text-left">Feature</th>
              {pricingPlans.map((plan) => (
                <th key={plan.id} className="py-3 px-6 text-center">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Assuming all features appear in all plans for simplicity */}
            {["Projects", "Storage", "Support"].map((feature, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
              >
                <td className="py-3 px-6">{feature}</td>
                {pricingPlans.map((plan) => (
                  <td key={plan.id} className="py-3 px-6 text-center">
                    {plan.features[idx]}
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