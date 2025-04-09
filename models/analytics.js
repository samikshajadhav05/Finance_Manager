import mongoose from "mongoose";
import Joi from "joi";


const analyticsSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
		totalExpenses: { type: Number, default: 0 },
		largestExpense: {
			amount: { type: Number, default: 0 },
			category: { type: String },
			date: { type: Date }
		},
		budgetGoalsMet: { type: Number, default: 0 },
		dailySpendingTrends: {
			type: [{ date: Date, amount: Number }],
			default: []
		},
		spendingHeatmap: { type: Map, of: Number, default: {} },
		categoryWiseSpending: { type: Map, of: Number, default: {} },
	},
	{ timestamps: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

const validateAnalytics = (data) => {
	const schema = Joi.object({
		userId: Joi.string().required().label("User ID"),
		totalExpenses: Joi.number().min(0).label("Total Expenses"),
		largestExpense: Joi.object({
			amount: Joi.number().min(0).label("Amount"),
			category: Joi.string().label("Category"),
			date: Joi.date().label("Date"),
		}).label("Largest Expense"),
		budgetGoalsMet: Joi.number().min(0).label("Budget Goals Met"),
		dailySpendingTrends: Joi.array().items(
			Joi.object({ date: Joi.date().label("Date"), amount: Joi.number().label("Amount") })
		).label("Daily Spending Trends"),
		spendingHeatmap: Joi.object().pattern(Joi.string(), Joi.number()).label("Spending Heatmap"),
		categoryWiseSpending: Joi.object().pattern(Joi.string(), Joi.number()).label("Category-wise Spending"),
	});
	return schema.validate(data);
};

export { Analytics, validateAnalytics };
