// import { PieChart as RePieChart, Pie, Tooltip, Cell } from "recharts";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const SavingsPieChart = () => {
//   const [savings, setSavings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSavings = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.warn("User token not found.");
//           return;
//         }

//         const response = await axios.get("http://localhost:5000/api/savings", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("✅ Savings Data:", response.data); // Debugging
//         setSavings(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("❌ Error fetching savings:", error);
//         setLoading(false);
//       }
//     };

//     fetchSavings();
//   }, []);

//   if (loading) return <p>Loading chart...</p>;

//   if (!savings || savings.length === 0) {
//     return <p>No savings data available.</p>;
//   }

//   // Prepare data for the PieChart
//   const chartData = savings.map((item) => ({
//     name: item.goalName, // Ensure correct key
//     value: item.savedAmount, // Ensure correct key
//   }));

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

//   return (
//     <div style={{ width: "400px", height: "400px" }}>
//       <RePieChart width={400} height={400}>
//         <Pie
//           data={chartData}
//           cx="50%"
//           cy="50%"
//           outerRadius={120}
//           fill="#8884d8"
//           dataKey="value"
//           label
//         >
//           {chartData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </RePieChart>
//     </div>
//   );
// };

// export default SavingsPieChart;

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const SavingsPieChart = () => {
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("User token not found.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/savings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Savings Data:", response.data);
        setSavings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching savings:", error);
        setLoading(false);
      }
    };

    fetchSavings();
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (!savings || savings.length === 0) return <p>No savings data available.</p>;

  // Prepare data for Chart.js Pie Chart
  const labels = savings.map((item) => item.goalName);
  const values = savings.map((item) => item.savedAmount);
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

  return (
    <div className="h-full w-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default SavingsPieChart;

