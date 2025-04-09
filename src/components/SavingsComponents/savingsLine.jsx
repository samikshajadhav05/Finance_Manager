import React, { useEffect, useState } from "react";
import { fetchSavings } from "../../services/addSavings.js"; 

const SavingsOverview = () => {
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalTarget, setTotalTarget] = useState(0);

  useEffect(() => {
    const loadSavings = async () => {
      try {
        const savings = await fetchSavings();

        const saved = savings.reduce((acc, goal) => acc + (goal.savedAmount || 0), 0);
        const target = savings.reduce((acc, goal) => acc + (goal.targetAmount || 0), 0);

        setTotalSaved(saved);
        setTotalTarget(target);
      } catch (error) {
        console.error("Failed to load savings data:", error);
      }
    };

    loadSavings();
  }, []);

  const progress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <div className="bg-greenMedium bg-opacity-30 p-6 rounded-2xl">
      <h2 className="text-lg font-semibold">Total Savings Progress</h2>
      <div className="mt-2 bg-green-500 h-4 rounded-full overflow-hidden">
        <div
          className="bg-green-200 h-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span>Saved: ₹ {totalSaved.toLocaleString()}</span>
        <span>Goal: ₹ {totalTarget.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default SavingsOverview;
