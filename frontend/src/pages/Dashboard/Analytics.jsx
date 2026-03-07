import React, { useEffect, useState } from "react";
import axios from "axios";
import AnalyticsCharts from "../../components/dashboard/AnalyticsCharts";

const Analytics = () => {
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
        console.error("Error fetching analytics:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p className="text-center mt-10">Loading analytics...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <AnalyticsCharts revenueData={stats.revenue} analyticsData={stats.analytics} />
    </div>
  );
};

export default Analytics;