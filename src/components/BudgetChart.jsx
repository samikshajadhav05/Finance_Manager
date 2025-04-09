import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BudgetChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Essential Expenses",
        data: [2000, 1800, 2200, 1900, 2100, 2000, 2300, 2400, 2100, 2200],
        backgroundColor: "#73BBA3",
      },
      {
        label: "Savings",
        data: [1200, 1300, 1100, 1400, 1500, 1200, 1400, 1300, 1250, 1350],
        backgroundColor: "#88D66C",
      },
      {
        label: "Discretionary Spending",
        data: [500, 600, 700, 550, 650, 400, 500, 600, 700, 800],
        backgroundColor: "#F6FB7A",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BudgetChart;
