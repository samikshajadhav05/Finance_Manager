// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const CategoryExpenseChart = ({ expenseData }) => {
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//         labels: {
//           color: '#21E6C1' // Legend label color
//         }
//       },
//       title: {
//         display: true,
//         text: 'Expenses by Category',
//         color: '#21E6C1', // Title color
//         font: {
//           size: 16,
//         }
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Amount ($)',
//           color: '#21E6C1' // Y-axis title color
//         },
//         ticks: {
//           color: '#21E6C1' // Y-axis labels color
//         },
//         grid: {
//           color: '#e5e5e5' // Y-axis grid lines color
//         }
//       },
//       x: {
//         ticks: {
//           color: '#21E6C1' // X-axis labels color
//         },
//         grid: {
//           color: '#808080' // X-axis grid lines color
//         }
//       }
//     }
//   };

//   const data = {
//     labels: ['Food', 'Travel', 'Shopping', 'Entertainment', 'Misc'],
//     datasets: [
//       {
//         data: [230.50, 150.75, 498.50, 200.25, 120.00],
//         backgroundColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderRadius: 6,
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-2xl p-4">
//       <Bar options={options} data={data} />
//     </div>
//   );
// };

// export default CategoryExpenseChart;

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategoryExpenseChart = () => {
  const [expenseData, setExpenseData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("User token not found.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/transaction", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Transactions:", response.data); // Debugging

        // Group expenses by category
        const categoryTotals = response.data.reduce((acc, transaction) => {
          acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
          return acc;
        }, {});

        setExpenseData(categoryTotals);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading expenses...</p>;

  // Chart labels & data
  const categories = Object.keys(expenseData);
  const amounts = Object.values(expenseData);

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Amount Spent ($)",
        data: amounts,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Expenses by Category",
        color: "#21E6C1",
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Amount ($)", color: "#21E6C1" },
        ticks: { color: "#21E6C1" },
        grid: { color: "#e5e5e5" },
      },
      x: {
        ticks: { color: "#21E6C1" },
        grid: { color: "#808080" },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl p-4">
      <Bar options={options} data={data} />
    </div>
  );
};

export default CategoryExpenseChart;
