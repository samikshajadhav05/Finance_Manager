import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { protect } from "../middleware/auth.js";
import generateToken from "../utils/generateToken.js";
import express from "express";
const router = express.Router(); 

router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);

        res.status(200).send({ 
            message: "Login successful", 
            token, 
            user: { 
                _id: user._id, 
                firstName: user.firstName, 
                lastName: user.lastName, 
                email: user.email 
            } 
        });

    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).send({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

export default router;
