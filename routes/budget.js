import express from "express";
import { Budget, validateBudget } from "../models/budget.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.post("/", protect, async (req, res) => {
	try {
	  if (!req.user || !req.user._id) {
		return res.status(400).json({ message: "User ID is required" });
	  }
  
	  const { category, targetAmount, startDate, endDate } = req.body;
  
	  if (!category || !targetAmount || !startDate || !endDate) {
		return res.status(400).json({ message: "All fields are required" });
	  }
  
	  const budget = new Budget({
		category,
		targetAmount,
		startDate,
		endDate,
		userId: req.user._id, 
	  });
  
	  await budget.save();
	  res.status(201).json({ message: "Budget created successfully", budget });
	} catch (error) {
	  console.error("Error creating budget:", error);
	  res.status(500).json({ message: "Internal server error" });
	}
  });
  

  router.put("/:id", protect, async (req, res) => {
	try {
	  const { category, targetAmount, startDate, endDate } = req.body;
  
	  const budget = await Budget.findOne({ _id: req.params.id, userId: req.user._id });
  
	  if (!budget) {
		return res.status(404).json({ message: "Budget not found" });
	  }
  
	  // Update budget fields
	  budget.category = category || budget.category;
	  budget.targetAmount = targetAmount || budget.targetAmount;
	  budget.startDate = startDate || budget.startDate;
	  budget.endDate = endDate || budget.endDate;
  
	  await budget.save();
	  res.status(200).json({ message: "Budget updated successfully", budget });
	} catch (error) {
	  console.error("Error updating budget:", error);
	  res.status(500).json({ message: "Internal server error" });
	}
  });
  

  router.delete("/:id", protect, async (req, res) => {
	try {
	  const budget = await Budget.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  
	  if (!budget) {
		return res.status(404).json({ message: "Budget not found" });
	  }
  
	  res.status(200).json({ message: "Budget deleted successfully" });
	} catch (error) {
	  console.error("Error deleting budget:", error);
	  res.status(500).json({ message: "Internal server error" });
	}
  });
  

  router.get("/", protect, async (req, res) => {
	try {
	  const budgets = await Budget.find({ userId: req.user._id });
  
	  if (!budgets || budgets.length === 0) {
		return res.status(404).json({ message: "No budgets found" });
	  }
  
	  res.status(200).json(budgets);
	} catch (error) {
	  console.error("Error fetching budgets:", error);
	  res.status(500).json({ message: "Internal server error" });
	}
  });
  

export default router;
