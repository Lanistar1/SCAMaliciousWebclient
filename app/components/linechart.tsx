// components/linechart.tsx
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Type for the graph data
interface GraphDataItem {
  x: string; // Month or label for the x-axis
  experienceCount: number;
  reportedExperienceCount: number;
  usersCount: number;
}

interface LineChartProps {
  graphData: GraphDataItem[];
}

const LineChart: React.FC<LineChartProps> = ({ graphData }) => {
  // Prepare chart data
  const chartData = useMemo(() => {
    const labels = graphData.map((item) => item.x); // x-axis labels (months)

    return {
      labels,
      datasets: [
        {
          label: "Content Count",
          data: graphData.map((item) => item.experienceCount),
          borderColor: "#3e95cd",
          backgroundColor: "rgba(62, 149, 205, 0.2)",
          fill: false,
        },
        {
          label: "Reported Content Count",
          data: graphData.map((item) => item.reportedExperienceCount),
          borderColor: "#ffa500",
          backgroundColor: "rgba(255, 165, 0, 0.2)",
          fill: false,
        },
        {
          label: "Users Count",
          data: graphData.map((item) => item.usersCount),
          borderColor: "#3cba9f",
          backgroundColor: "rgba(60, 186, 159, 0.2)",
          fill: false,
        },
      ],
    };
  }, [graphData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Trends" },
    },
    scales: {
      x: { title: { display: true, text: "Month" } },
      y: { title: { display: true, text: "Count" } },
    },
  };

  return (
    <div className="items-start md:w-[900px] xl:w-[1010px]  h-[300px] md:h-[450px] pl-20 mb-10 py-10 bg-white rounded-lg shadow">
      <h2>Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
