import { useState, useEffect } from "react";
import { addSavingsGoal, updateSavingsGoal } from "../../services/addSavings.js";

const SavingsForm = ({ onGoalAdded, editingGoal, setEditingGoal  }) => {
  const [data, setData] = useState({
    goalName: "",
    targetAmount: "",
    savedAmount: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingGoal && editingGoal._id) {
        console.log("Editing Goal:", editingGoal);
        setData({
            ...editingGoal,
            startDate: editingGoal.startDate ? editingGoal.startDate.split("T")[0] : "",
            endDate: editingGoal.endDate ? editingGoal.endDate.split("T")[0] : "",
        });
    }
}, [editingGoal]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: ["targetAmount", "savedAmount"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { _id, createdAt, updatedAt, ...restData } = {
            ...data,
            startDate: data.startDate ? new Date(data.startDate).toISOString() : "",
            endDate: data.endDate ? new Date(data.endDate).toISOString() : "",
        };

        const formattedData = {
            ...restData,
            userId: editingGoal?.userId || localStorage.getItem("userId"), // Ensure userId is included
        };

        if (editingGoal?._id) {
            await updateSavingsGoal(editingGoal._id, formattedData);
            alert("Goal updated successfully!");
        } else {
            await addSavingsGoal(formattedData);
            alert("Goal added successfully!");
        }

        setData({ goalName: "", targetAmount: "", savedAmount: "", startDate: "", endDate: "" });
        onGoalAdded();
    } catch (error) {
        alert(error.message || "Error saving goal.");
    }
};


  return (
    <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl shadow-lg">
      <h2 className="text-base text-text sm:text-lg font-bold mb-4">Add Savings Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="number"
            placeholder="Goal amount"
            value={data.targetAmount}
            onChange={handleChange}
            name="targetAmount"
            required
            className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Goal Name"
            value={data.goalName}
            onChange={handleChange}
            name="goalName"
            required
            className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="date"
            name="startDate"
            value={data.startDate}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
          />
          <input
            type="date"
            name="endDate"
            value={data.endDate}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="number"
            placeholder="Amount saved"
            value={data.savedAmount}
            onChange={handleChange}
            name="savedAmount"
            required
            className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center items-center w-full sm:w-1/2 p-2 bg-greenLight hover:bg-text rounded-lg font-semibold"
        >
          {editingGoal ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default SavingsForm;
