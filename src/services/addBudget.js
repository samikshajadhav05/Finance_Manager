import axios from "axios";

const API_URL = "http://localhost:5000/api/budget";

export const addBudget = async (budgetData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found. Please log in again.");

    const response = await axios.post(API_URL, budgetData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding budget:", error);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};
