import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <div className="w-15 h-15 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  );

  // Prepare charts
  const revenueData = {
    labels: stats.revenue.map(r => r.month),
    datasets: [
      {
        label: "Revenue",
        data: stats.revenue.map(r => r.revenue),
        fill: true,
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "rgba(59,130,246,1)",
      },
    ],
  };

  const analyticsData = {
    labels: stats.analytics.map(a => a.day),
    datasets: [
      {
        label: "Visits",
        data: stats.analytics.map(a => a.visits),
        fill: true,
        backgroundColor: "rgba(16,185,129,0.2)",
        borderColor: "rgba(16,185,129,1)",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <motion.div className="bg-blue-400 text-white p-6 rounded-xl shadow" initial={{y: -20, opacity:0}} animate={{y:0, opacity:1}}>
          <h2 className="text-white">Users</h2>
          <p className="text-2xl font-bold">{stats.users}</p>
        </motion.div>

        <motion.div className="bg-green-400 text-white p-6 rounded-xl shadow" initial={{y: -20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.1}}>
          <h2 className="text-white">Blogs</h2>
          <p className="text-2xl font-bold">{stats.blogs}</p>
        </motion.div>

        <motion.div className="bg-yellow-400 text-white p-6 rounded-xl shadow" initial={{y: -20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.2}}>
          <h2 className="text-white">Contacts</h2>
          <p className="text-2xl font-bold">{stats.contacts}</p>
        </motion.div>

        <motion.div className="bg-purple-400 text-white p-6 rounded-xl shadow" initial={{y: -20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.3}}>
          <h2 className="text-white">Services</h2>
          <p className="text-2xl font-bold">{stats.services}</p>
        </motion.div>

        <motion.div className="bg-pink-400 text-white p-6 rounded-xl shadow" initial={{y: -20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.4}}>
          <h2 className="text-white">Case Studies</h2>
          <p className="text-2xl font-bold">{stats.caseStudies}</p>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
        <Line data={revenueData} />
      </div>

      {/* Analytics Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Weekly Visits</h2>
        <Line data={analyticsData} />
      </div>

    </div>
  );
};

export default DashboardHome;