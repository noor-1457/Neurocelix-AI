import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );

  // Recharts format data
  const revenueData = stats.revenue.map((r) => ({
    month: r.month,
    revenue: r.revenue,
  }));

  const analyticsData = stats.analytics.map((a) => ({
    day: a.day,
    visits: a.visits,
  }));

  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        
        <motion.div
          className="bg-blue-400 text-white p-5 rounded-xl shadow min-h-[110px]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-sm sm:text-base">Users</h2>
          <p className="text-2xl sm:text-3xl font-bold">{stats.users}</p>
        </motion.div>

        <motion.div
          className="bg-green-400 text-white p-5 rounded-xl shadow min-h-[110px]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-sm sm:text-base">Blogs</h2>
          <p className="text-2xl sm:text-3xl font-bold">{stats.blogs}</p>
        </motion.div>

        <motion.div
          className="bg-yellow-400 text-white p-5 rounded-xl shadow min-h-[110px]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm sm:text-base">Contacts</h2>
          <p className="text-2xl sm:text-3xl font-bold">{stats.contacts}</p>
        </motion.div>

        <motion.div
          className="bg-purple-400 text-white p-5 rounded-xl shadow min-h-[110px]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-sm sm:text-base">Services</h2>
          <p className="text-2xl sm:text-3xl font-bold">{stats.services}</p>
        </motion.div>

        <motion.div
          className="bg-pink-400 text-white p-5 rounded-xl shadow min-h-[110px]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-sm sm:text-base">Case Studies</h2>
          <p className="text-2xl sm:text-3xl font-bold">{stats.caseStudies}</p>
        </motion.div>

      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-base sm:text-lg font-semibold mb-4">
          Monthly Revenue
        </h2>

        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-base sm:text-lg font-semibold mb-4">
          Weekly Visits
        </h2>

        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#10B981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default DashboardHome;