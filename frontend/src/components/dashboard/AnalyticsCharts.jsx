import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AnalyticsCharts = ({ revenueData, analyticsData }) => {
  // Recharts format
  const formattedRevenue = revenueData.map(r => ({
    month: r.month,
    revenue: r.revenue,
  }));

  const formattedAnalytics = analyticsData.map(a => ({
    day: a.day,
    visits: a.visits,
  }));

  return (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Weekly Visits</h2>
        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedAnalytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visits" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;