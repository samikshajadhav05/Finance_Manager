import axios from "axios";

const ExpenseList = ({ expenses, setForm, fetchExpenses }) => {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/transaction/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="bg-greenMedium bg-opacity-50 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Title</th>
            <th className="border-b p-2">Amount</th>
            <th className="border-b p-2">Category</th>
            <th className="border-b p-2">Date</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td className="border-b p-2">{expense.title}</td>
              <td className="border-b p-2">{expense.amount}</td>
              <td className="border-b p-2">{expense.category}</td>
              <td className="border-b p-2">
                {new Date(expense.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </td>
              <td className="border-b p-2">
                <button onClick={() => setForm(expense)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => handleDelete(expense._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
