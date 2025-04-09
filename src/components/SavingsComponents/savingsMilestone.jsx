import { useEffect, useState } from "react";

const Milestone = () => {
  const [savings, setSavings] = useState([]);
  const [milestone, setMilestone] = useState(null);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No authentication token found. Please log in again.");
          return;
        }

        const response = await fetch("http://localhost:5000/api/savings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) {
          setSavings(data);

          // Find the goal with the highest completion percentage
          if (data.length > 0) {
            const highestPercentageGoal = data.reduce((prev, curr) => {
              const prevPercent = (prev.savedAmount / prev.targetAmount) * 100;
              const currPercent = (curr.savedAmount / curr.targetAmount) * 100;
              return currPercent > prevPercent ? curr : prev;
            });

            setMilestone(highestPercentageGoal);
          }
        } else {
          alert(data.message || "Error fetching savings data");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
      }
    };

    fetchSavings();
  }, []);

  return (
    <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl shadow-lg w-full sm:w-2/3">
      <h2 className="text-base text-text text-text sm:text-lg font-bold">Milestone</h2>

      {milestone ? (
        <>
          <p className="mt-2">
            {((milestone.savedAmount / milestone.targetAmount) * 100).toFixed(0)}% of {milestone.goalName} Done !!
          </p>
          <div className="w-full bg-greenLight h-4 rounded-full mt-4">
            <div
              className="bg-text h-4 rounded-full"
              style={{
                width: `${((milestone.savedAmount / milestone.targetAmount) * 100).toFixed(0)}%`,
              }}
            ></div>
          </div>
          <p className="text-sm mt-2">
            ₹ {milestone.savedAmount} / ₹ {milestone.targetAmount}
          </p>
        </>
      ) : (
        <p className="mt-2">No milestones yet.</p>
      )}
    </div>
  );
};

export default Milestone;
