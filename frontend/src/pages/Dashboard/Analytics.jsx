import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const userData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 800 },
  { name: "Mar", users: 600 },
  { name: "Apr", users: 1200 },
  { name: "May", users: 900 }
];

const revenueData = [
  { name: "Jan", revenue: 2400 },
  { name: "Feb", revenue: 1398 },
  { name: "Mar", revenue: 9800 },
  { name: "Apr", revenue: 3908 },
  { name: "May", revenue: 4800 }
];

const trafficData = [
  { name: "Organic", value: 400 },
  { name: "Ads", value: 300 },
  { name: "Social", value: 300 },
  { name: "Referral", value: 200 }
];

const COLORS = ["#7C3AED", "#06B6D4", "#10B981", "#F59E0B"];

const Analytics = () => {
  return (
    <div className="space-y-8">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Total Users", value: "24,530" },
          { title: "Total Revenue", value: "$89,000" },
          { title: "Active Sessions", value: "1,204" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
          >
            <h3 className="text-gray-500">{item.title}</h3>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Line Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
      >
        <h2 className="text-lg font-semibold mb-4">User Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userData}>
            <Line type="monotone" dataKey="users" stroke="#7C3AED" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#06B6D4" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Traffic Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {trafficData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  );
};

export default Analytics;