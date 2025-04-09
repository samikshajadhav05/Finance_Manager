import express from "express";
import { Savings, validateSavings } from "../models/savings.js";
import { protect } from "../middleware/auth.js";
const router = express.Router(); 

router.post("/", protect, async (req, res) => {
	try {
		const { error } = validateSavings(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const savings = new Savings({
			userId: req.user._id,
			goalName: req.body.goalName,
			targetAmount: req.body.targetAmount,
			savedAmount: req.body.savedAmount || 0, 
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			status: req.body.status || "Ongoing",
		});

		await savings.save();
		res.status(201).send({ message: "Savings goal added successfully", savings });
	} catch (error) {
		console.error("Error adding savings goal:", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/", protect, async (req, res) => {
    try {

		const savings = await Savings.find({ userId: req.user._id });
		
		if (!savings.length) {
			return res.status(404).json({ message: "No savings goals found" });
		}
		
        res.json(savings); 
    } catch (error) {
        console.error("Error fetching savings:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/:id", protect, async (req, res) => {
    try {
        const { error } = validateSavings(req.body);
        if (error) {
            console.error("Validation Error:", error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        }

        const savings = await Savings.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            {
                goalName: req.body.goalName,
                targetAmount: req.body.targetAmount,
                savedAmount: req.body.savedAmount,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                status: req.body.status,
            },
            { new: true, runValidators: true }
        );

        if (!savings) {
            console.error("Savings Goal Not Found for ID:", req.params.id);
            return res.status(404).json({ message: "Savings goal not found" });
        }

        res.json({ message: "Savings goal updated successfully", savings });
    } catch (error) {
        console.error("Error updating savings goal:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


export default router;
