const Expense = require("../models/Expense");
const mongoose = require("mongoose"); // ADD at top of file

// ADD EXPENSE
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
      userId: req.user.id,   // ✅ THIS LINE FIXES EVERYTHING
      date: new Date(),
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("ADD EXPENSE ERROR:", error);
    res.status(500).json({ message: "Failed to add expense" });
  }
};

/* Get All Expenses */
exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
  res.json(expenses);
};

exports.getCategorySummary = async (req, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.id;

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const summary = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: { $toLower: "$category" }, // ✅ normalize
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          category: { $toUpper: "$_id" },
          total: 1,
          _id: 0,
        },
      },
    ]);

    res.json(summary);
  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* Clear Monthly History */
exports.clearMonthlyExpenses = async (req, res) => {
  const { month, year } = req.query;

  await Expense.deleteMany({
    user: req.user.id,
    $expr: {
      $and: [
        { $eq: [{ $month: "$date" }, Number(month)] },
        { $eq: [{ $year: "$date" }, Number(year)] },
      ],
    },
  });

  res.json({ message: "Monthly history cleared" });
};


exports.addSampleExpensesIfEmpty = async (userId) => {
  const count = await Expense.countDocuments({ userId });

  if (count > 0) return; // ✅ add ONLY once

  await Expense.insertMany([
    { title: "Lunch", amount: 250, category: "Food", userId },
    { title: "Bus", amount: 100, category: "Travel", userId },
    { title: "Movie", amount: 200, category: "Movie", userId },
  ]);
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

exports.getMonthlyExpenses = async (req, res) => {
  try {
    const { month, year } = req.query;

    const expenses = await Expense.find({
      user: req.user.id,
      $expr: {
        $and: [
          { $eq: [{ $month: "$date" }, Number(month)] },
          { $eq: [{ $year: "$date" }, Number(year)] },
        ],
      },
    }).sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch monthly expenses" });
  }
};