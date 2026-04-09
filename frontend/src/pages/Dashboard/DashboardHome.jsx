import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext"; 
import api from "../../api/api"; 

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const { dark } = useContext(AuthContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats"); 
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 dark:bg-gray-900">
        <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 dark:text-gray-300 text-sm">Loading...</p>
      </div>
    );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

        <motion.div className="bg-green-500 dark:bg-green-600 text-white p-5 rounded-xl shadow min-h-30">
          <h2>Blogs</h2>
          <p className="text-2xl font-bold">{stats.blogs}</p>
        </motion.div>

        <motion.div className="bg-yellow-500 dark:bg-yellow-600 text-white p-5 rounded-xl shadow min-h-30">
          <h2>Contacts</h2>
          <p className="text-2xl font-bold">{stats.contacts}</p>
        </motion.div>

        <motion.div className="bg-purple-500 dark:bg-purple-600 text-white p-5 rounded-xl shadow min-h-30">
          <h2>Services</h2>
          <p className="text-2xl font-bold">{stats.services}</p>
        </motion.div>

        <motion.div className="bg-pink-500 dark:bg-pink-600 text-white p-5 rounded-xl shadow min-h-30">
          <h2>Case Studies</h2>
          <p className="text-2xl font-bold">{stats.caseStudies}</p>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <div
        className={`p-4 sm:p-6 rounded-xl shadow ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          Monthly Revenue
        </h2>

        <div className="w-full h-75">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
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
      <div
        className={`p-4 sm:p-6 rounded-xl shadow ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          Weekly Visits
        </h2>

        <div className="w-full h-75">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
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
