const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addExpense,
  getExpenses,
  getMonthlyExpenses,
  getCategorySummary,
  deleteExpense,
  clearMonthlyExpenses,
} = require("../controllers/expenseController");

// Add expense
router.post("/", auth, addExpense);

// Get all expenses
router.get("/", auth, getExpenses);

// Get monthly expenses
router.get("/monthly", auth, getMonthlyExpenses);

// Get category summary (pie chart)
router.get("/summary", auth, getCategorySummary);

// Delete expense
router.delete("/:id", auth, deleteExpense);

// Clear monthly expenses
router.delete("/monthly/clear", auth, clearMonthlyExpenses);

module.exports = router;
