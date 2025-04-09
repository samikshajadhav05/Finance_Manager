import { useEffect, useState } from "react";
import axios from "axios";

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/transaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Store only the top 6 transactions
        setTransactions(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col-reverse lg:w-[348px] gap-6 rounded-xl bg-greenMedium bg-opacity-30">
      <div className="p-6 rounded-b-2xl h-2/3">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <div className="mt-4 space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center">
                <p>{transaction.title}</p>
                <p>₹ {transaction.amount}</p>
              </div>
            ))
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
