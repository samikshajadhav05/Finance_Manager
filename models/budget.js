import mongoose from "mongoose";
import Joi from "joi";

// budget to spend on a category
const budgetSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	category: { type: String, required: true },
	targetAmount: { type: Number, required: true },
	spentAmount: { type: Number, default: 0 },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true }
}, { timestamps: true });

const Budget = mongoose.model("Budget", budgetSchema);

const validateBudget = (data) => {
	const schema = Joi.object({
		userId: Joi.string().required().label("User ID"),
		category: Joi.string().required().label("Goal Name"),
		targetAmount: Joi.number().positive().required().label("Target Amount"),
		spentAmount: Joi.number().min(0).label("Spent Amount"),
		startDate: Joi.date().required().label("Start Date"),
		endDate: Joi.date().required().label("End Date")
	});
	return schema.validate(data);
};

export { Budget, validateBudget };
