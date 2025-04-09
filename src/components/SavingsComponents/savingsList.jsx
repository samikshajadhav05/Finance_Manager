import React, { useState } from "react";

const SavingsList = ({ savings, setEditingGoal }) => {
  const [activeFilter, setActiveFilter] = useState("Ongoing");

  const categorizeSavings = (savings) => {
    const upcoming = [];
    const ongoing = [];
    const completed = [];

    savings.forEach((saving) => {
      const progress = saving.targetAmount === 0 ? 0 : (saving.savedAmount / saving.targetAmount) * 100;

      if (progress === 0) {
        upcoming.push(saving);
      } else if (progress >= 100) {
        completed.push(saving);
      } else {
        ongoing.push(saving);
      }
    });

    return { upcoming, ongoing, completed };
  };

  const { upcoming, ongoing, completed } = categorizeSavings(savings);

  const getFilteredSavings = () => {
    switch (activeFilter) {
      case "Upcoming": return upcoming.slice(0, 6);
      case "Completed": return completed.slice(0, 6);
      default: return ongoing.slice(0, 6);
    }
  };

  const filteredSavings = getFilteredSavings();

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["Ongoing", "Upcoming", "Completed"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`p-2 rounded-lg font-semibold ${
              activeFilter === filter ? "bg-greenDark text-white" : "bg-greenLight"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredSavings.length === 0 ? (
          <p className="text-gray-300">No savings goals in this category.</p>
        ) : (
          filteredSavings.map((saving) => {
            const progress = saving.targetAmount === 0 ? 0 : (saving.savedAmount / saving.targetAmount) * 100;

            return (
              <li
                key={saving._id}
                className="flex justify-between items-center bg-blue p-3 rounded-lg shadow"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{saving.goalName}</span>
                  <span className="text-sm text-gray-300">
                    Progress: {progress.toFixed(0)}%
                  </span>
                </div>
                {progress < 100 && (
                  <button
                    onClick={() => setEditingGoal(saving)}
                    className="p-2 bg-greenLight hover:bg-greenDark text-white rounded-lg font-semibold"
                  >
                    Add Funds
                  </button>
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default SavingsList;
