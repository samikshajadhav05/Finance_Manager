import mongoose from "mongoose";
import Joi from "joi";

// Saving goal schema
const savingsSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		goalName: { type: String, required: true },
		targetAmount: { type: Number, required: true },
		savedAmount: { type: Number, default: 0 },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		status: { type: String, enum: ["Ongoing", "Upcoming", "Completed"], default: "Ongoing" },
	},
	{ timestamps: true }
);

const Savings = mongoose.models.Savings || mongoose.model("Savings", savingsSchema);

const validateSavings = (data) => {
	const schema = Joi.object({
		userId: Joi.string().required().label("User ID"),
		goalName: Joi.string().required().label("Goal Name"),
		targetAmount: Joi.number().positive().required().label("Target Amount"),
		savedAmount: Joi.number().min(0).label("Saved Amount"),
		startDate: Joi.date().required(),
		endDate: Joi.date().required().label("End Date"),
		status: Joi.string().valid("Ongoing", "Upcoming", "Completed").label("Status"),
	});
	return schema.validate(data);
};


export { Savings, validateSavings };
