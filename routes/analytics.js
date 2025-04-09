import express from "express";
import { Transaction, validateTransaction } from "../models/transaction.js";
const router = express.Router(); 

// Get Analytics Data
router.get("/:userId", async (req, res) => {
	const transactions = await Transaction.find({ userId: req.params.userId });

	const totalExpenses = transactions.reduce((sum, t) => sum + (t.type === "expense" ? t.amount : 0), 0);
	const totalIncome = transactions.reduce((sum, t) => sum + (t.type === "income" ? t.amount : 0), 0);
	const largestExpense = transactions.filter(t => t.type === "expense").sort((a, b) => b.amount - a.amount)[0] || null;

	res.send({ totalExpenses, totalIncome, largestExpense });
});

export default router;
