import mongoose from "mongoose";
import Joi from "joi";

const transactionSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
	title: { type: String, required: true, maxlength: 100 },
	amount: { type: Number, required: true, min: 1 },
	category: { type: String, required: true, enum: ["Food", "Transportation", "Lifestyle","Entertainment", "Health", "Other"] },
	date: { type: Date, default: () => new Date() }, 
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

const validateTransaction = (data) => {
	const schema = Joi.object({
		userId: Joi.string().required().label("User ID"),
		title: Joi.string().required().label("Title"),
		amount: Joi.number().positive().required().label("Amount"),
		category: Joi.string().required().label("Category"),
		date: Joi.date().label("Date"),
	});
	return schema.validate(data);
};

// Export in ES module format
export { Transaction, validateTransaction };
