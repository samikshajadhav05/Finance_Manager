import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("❌ User token not found in local storage.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/transaction", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Transactions Data:", response.data);
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Process transactions by category
  const categoryData = transactions.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const labels = Object.keys(categoryData);
  const values = Object.values(categoryData);
  const colors = ["#73BBA3", "#88D66C", "#B4E380", "#F6FB7A", "#BFF6C3"];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: "transparent",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#EFE3C2",
        },
      },
    },
  };

  if (loading) return <p>Loading chart...</p>;
  if (labels.length === 0) return <p>No expenses to display.</p>;

  return (
    <div className="h-full w-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
