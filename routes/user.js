import { User, validate } from "../models/user.js";
import bcrypt from "bcrypt";
import { protect } from "../middleware/auth.js";
import express from "express";
const router = express.Router(); 

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser) return res.status(409).send({ message: "User with given email already exists!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const user = new User({ ...req.body, password: hashPassword });
		await user.save();

		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.error("Error in user registration:", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// 🔹 Protected Route - Fetch User Details
router.get("/profile", protect, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) return res.status(404).send({ message: "User not found" });

		res.status(200).json(user);
	} catch (error) {
		console.error("Error fetching user profile:", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

export default router;
