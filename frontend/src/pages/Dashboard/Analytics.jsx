import React, { useEffect, useState } from "react";
import axios from "axios";
import AnalyticsCharts from "../../components/dashboard/AnalyticsCharts";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
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

  return (
    <div className="sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <AnalyticsCharts
        revenueData={stats.revenue}
        analyticsData={stats.analytics}
      />
    </div>
  );
};

export default Analytics;