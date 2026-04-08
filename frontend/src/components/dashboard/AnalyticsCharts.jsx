import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../context/AuthContext"; 

const AnalyticsCharts = ({ revenueData, analyticsData }) => {
  const { dark } = useContext(AuthContext);

  const formattedRevenue = revenueData.map((r) => ({
    month: r.month,
    revenue: r.revenue,
  }));

  const formattedAnalytics = analyticsData.map((a) => ({
    day: a.day,
    visits: a.visits,
  }));

  const gridColor = dark ? "#374151" : "#e5e7eb"; 
  const axisColor = dark ? "#D1D5DB" : "#1F2937";  
  const tooltipStyle = {
    backgroundColor: dark ? "#1F2937" : "#fff",
    color: dark ? "#fff" : "#000",
    border: "1px solid",
    borderColor: dark ? "#374151" : "#E5E7EB",
    borderRadius: "6px",
    padding: "8px",
  };

  return (
    <div className="space-y-6">
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
        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedRevenue}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip contentStyle={tooltipStyle} />
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
        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedAnalytics}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip contentStyle={tooltipStyle} />
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

export default AnalyticsCharts;
