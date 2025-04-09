import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import TransactionsList from "../components/TransactionList";
import TotalExpenses from "../components/ExpensesComponents/ExpenseTotal";

const Analytics = () => {
  const [transactions, setTransactions] = useState([]);
  const [maxExpense, setMaxExpense] = useState({ amount: 0, category: "" });
  const [viewType, setViewType] = useState("weekly");
  const [lineChartData, setLineChartData] = useState({ labels: [], data: [] });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/transaction", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
        const max = res.data.reduce(
          (max, txn) =>
            parseFloat(txn.amount) > parseFloat(max.amount) ? txn : max,
          { amount: 0, category: "" }
        );
        setMaxExpense(max);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, [token]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/analytics/spending?type=${viewType}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLineChartData(res.data);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      }
    };

    fetchAnalytics();
  }, [viewType, token]);

  return (
    <div className="bg-greenDeep text-text min-h-screen w-full overflow-x-hidden p-12">
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Column 1 */}
        <div className="flex flex-col items-center h-auto bg-greenMedium bg-opacity-30 w-full lg:w-[350px] rounded-2xl p-4">
          <h1 className="text-xl font-semibold text-text p-4">Total Expenses</h1>
          <TotalExpenses />
          <h1 className="text-xl font-semibold text-text p-4">Transactions</h1>
          <div className="bg-gradient-to-b from-greenMedium to-greenLight p-6 rounded-2xl h-auto w-full">
            <div className="space-y-4">
              <TransactionsList />
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6 w-full">
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="h-[230px] w-full lg:w-1/3 bg-greenMedium bg-opacity-30 rounded-2xl">
              <p className="text-xl font-semibold p-6">Largest Expense</p>
              <p className="text-4xl font-bold p-6 flex justify-center items-center">
                ₹ {maxExpense.amount}
              </p>
              <p className="text-l font-medium flex justify-center items-center">
                {maxExpense.category}
              </p>
            </div>

            <div className="h-[230px] w-full lg:w-1/3 bg-greenMedium bg-opacity-30 rounded-2xl flex flex-col justify-center items-center">
              <p className="text-xl font-semibold">Budget Goals</p>
              <div className="w-3/4 mt-4">{/* Add logic later */}</div>
            </div>

            <div className="h-[230px] w-full lg:w-1/3 bg-greenMedium bg-opacity-30 rounded-2xl flex justify-center items-center">
              <p className="text-xl font-semibold">Spending Heatmap</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="h-[430px] w-full lg:w-1/2 rounded-2xl bg-greenMedium bg-opacity-30 flex flex-col">
              <h1 className="text-xl font-semibold p-6">Categorywise Spending</h1>
              <div className="flex-grow flex justify-center items-center">
                <PieChart className="h-full w-full max-w-full max-h-full" />
              </div>
            </div>

            <div className="h-[430px] w-full lg:w-1/2 rounded-2xl bg-greenMedium bg-opacity-30 flex flex-col">
              <h1 className="text-xl font-semibold p-6">
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)} Spending Trends
              </h1>
              <div className="flex-grow flex justify-center items-center">
                <LineChart
                  className="h-full w-full max-w-full max-h-full"
                  labels={lineChartData.labels}
                  data={lineChartData.data}
                />
              </div>
              <div className="p-4 flex justify-center gap-4">
                {["weekly", "monthly", "yearly"].map((type) => (
                  <button
                    key={type}
                    className={`rounded-2xl m-1 text-xs px-4 py-2 ${
                      viewType === type
                        ? "bg-greenDeep text-white"
                        : "bg-greenMedium hover:bg-greenDeep"
                    }`}
                    onClick={() => setViewType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
