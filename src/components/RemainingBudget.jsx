import React, { useEffect, useState } from "react";
import axios from "axios";

const RemainingBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const [budgetRes, transactionRes] = await Promise.all([
          axios.get("http://localhost:5000/api/budget", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/transaction", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setBudgets(budgetRes.data);
        setTransactions(transactionRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!budgets.length || !transactions.length) return;

    let totalRemaining = 0;

    budgets.forEach((budget) => {
      const budgetStart = new Date(budget.startDate);
      const budgetEnd = new Date(budget.endDate);

      const totalExpensesForCategory = transactions
        .filter(
          (txn) =>
            txn.category === budget.category &&
            new Date(txn.date) >= budgetStart &&
            new Date(txn.date) <= budgetEnd
        )
        .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

      totalRemaining += budget.targetAmount - totalExpensesForCategory;
    });

    setRemaining(totalRemaining);
  }, [budgets, transactions]);

  return (
      <p className="text-3xl font-bold text-white-700">
        ${remaining.toFixed(1)}
      </p>
  );
};

export default RemainingBudget;
