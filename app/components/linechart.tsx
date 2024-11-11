// components/LineChart.js
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = useMemo(() => ({
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "Applied",
        data: [86, 114, 106, 106, 107, 111, 133],
        borderColor: "#3e95cd",
        backgroundColor: "#7bb6dd",
        fill: false,
      },
      {
        label: "Accepted",
        data: [70, 90, 44, 60, 83, 90, 100],
        borderColor: "#3cba9f",
        backgroundColor: "#71d1bd",
        fill: false,
      },
      {
        label: "Pending",
        data: [10, 21, 60, 44, 17, 21, 17],
        borderColor: "#ffa500",
        backgroundColor: "#ffc04d",
        fill: false,
      },
      {
        label: "Rejected",
        data: [6, 3, 2, 2, 7, 0, 16],
        borderColor: "#c45850",
        backgroundColor: "#d78f89",
        fill: false,
      },
    ],
  }), []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Report",
      },
    },
  };

  return (
    <div className="h-[300px] md:h-[400px] p-4">
      <Line data={data} />
    </div>
  );
};

export default LineChart;
