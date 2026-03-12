import React from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
   Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,       // <-- Import Filler
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,       // <-- Register Filler
  Tooltip,
  Legend
);

const AnalyticsCharts = ({ revenueData, analyticsData }) => {
  return (
    <div className="space-y-6">
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
        <Line
          data={{
            labels: revenueData.map((r) => r.month),
            datasets: [
              {
                label: "Revenue",
                data: revenueData.map((r) => r.revenue),
                fill: true,
                backgroundColor: "rgba(59,130,246,0.2)",
                borderColor: "rgba(59,130,246,1)",
              },
            ],
          }}
        />
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold mb-4">Weekly Visits</h2>
        <Line
          data={{
            labels: analyticsData.map((a) => a.day),
            datasets: [
              {
                label: "Visits",
                data: analyticsData.map((a) => a.visits),
                fill: true,
                backgroundColor: "rgba(16,185,129,0.2)",
                borderColor: "rgba(16,185,129,1)",
              },
            ],
          }}
        />
      </motion.div>
    </div>
  );
};

export default AnalyticsCharts;