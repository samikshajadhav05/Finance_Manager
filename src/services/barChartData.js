import axios from "axios";

export const fetchChartData = async (token) => {
  try {
    const [savingsRes, expensesRes] = await Promise.all([
      axios.get("http://localhost:5000/api/savings", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    return {
      savings: savingsRes.data,
      expenses: expensesRes.data,
    };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return { savings: [], expenses: [] };
  }
};
