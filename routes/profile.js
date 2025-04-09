import express from "express";
import { protect } from "../middleware/auth.js";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
