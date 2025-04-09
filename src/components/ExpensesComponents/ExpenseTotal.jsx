import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalExpenses = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("Daily");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/transaction", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions", err);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const now = new Date();

    const filtered = transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      if (activeTab === "Daily") {
        return txnDate.toDateString() === now.toDateString();
      } else if (activeTab === "Monthly") {
        return (
          txnDate.getMonth() === now.getMonth() &&
          txnDate.getFullYear() === now.getFullYear()
        );
      } else if (activeTab === "Yearly") {
        return txnDate.getFullYear() === now.getFullYear();
      }
      return false;
    });

    const totalAmount = filtered.reduce((sum, txn) => sum + parseFloat(txn.amount), 0);
    setTotal(totalAmount);
  }, [activeTab, transactions]);

  return (
    <div className="h-auto bg-greenLight bg-gradient-to-b from-greenLight to-greenMedium w-full rounded-2xl">
      <div className="flex justify-center items-center p-2">
        {["Daily", "Monthly", "Yearly"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-2xl m-1 text-xs px-4 py-2 ${
              activeTab === tab ? "bg-greenDeep text-white" : "bg-greenMedium hover:bg-greenDeep"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <h1 className="flex justify-center items-center text-4xl font-bold p-6">
      ₹ {total.toLocaleString()}
      </h1>
    </div>
  );
};

export default TotalExpenses;
