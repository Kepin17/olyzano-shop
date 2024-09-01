import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RavenueMonthlyChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "User 2024",
        data: [120, 150, 180, 220, 200, 240, 210, 230, 260, 300, 280, 10000],
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14, 165, 233, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Ravenue Overview",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default RavenueMonthlyChart;
