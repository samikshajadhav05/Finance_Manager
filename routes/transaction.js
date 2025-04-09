import express from "express";
import { Transaction, validateTransaction } from "../models/transaction.js";
import { protect } from "../middleware/auth.js"; 

const router = express.Router(); 

router.post("/", protect, async (req, res) => {
	try {
		req.body.userId = req.user._id.toString();

		const { error } = validateTransaction(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const transaction = new Transaction({
			userId: req.user._id,
			title: req.body.title,
			amount: req.body.amount,
			category: req.body.category,
			date: req.body.date || new Date(),
		});

		await transaction.save();
		res.status(201).send({ message: "Transaction added successfully", transaction });
	} catch (error) {
		console.error("Error adding transaction:", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/", protect, async (req, res) => {
	try {
		const transactions = await Transaction.find({ userId: req.user._id.toString() }).sort({ date: -1 });

		res.status(200).json(transactions);
	} catch (error) {
		console.error("Error fetching transactions:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});



router.put("/:id", protect, async (req, res) => {
	try {
		req.body.userId = req.user._id.toString();
		const { createdAt, __v, ...filteredBody } = req.body;

		const { error } = validateTransaction(req.body);
		if (error) return res.status(400).json({ message: error.details[0].message });

		const transaction = await Transaction.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user._id },
			req.body,
			{ new: true }
		);
		if (!transaction) return res.status(404).json({ message: "Transaction not found" });

		res.status(200).json({ message: "Transaction updated successfully", transaction });
	} catch (error) {
		console.error("Error updating transaction:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});


router.delete("/:id", protect, async (req, res) => {
	try {
		const transaction = await Transaction.findOneAndDelete({
			_id: req.params.id,
			userId: req.user._id,
		});
		if (!transaction) return res.status(404).json({ message: "Transaction not found" });

		res.status(200).json({ message: "Transaction deleted successfully" });
	} catch (error) {
		console.error("Error deleting transaction:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});


export default router;
