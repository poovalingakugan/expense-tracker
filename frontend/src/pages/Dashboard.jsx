import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Charts from "../components/Charts";
import API from "../services/api";

const SAMPLE_EXPENSES = [
  { title: "Movie", amount: 200, category: "Entertainment" },
  { title: "Lunch", amount: 250, category: "Food" },
  { title: "Bus", amount: 100, category: "Travel" },
];

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    const res = await API.get("/expenses");

    // add samples only ONCE
    if (res.data.length === 0) {
      for (const exp of SAMPLE_EXPENSES) {
        await API.post("/expenses", exp);
      }
      const again = await API.get("/expenses");
      setExpenses(again.data);
    } else {
      setExpenses(res.data);
    }
  };

  const addExpense = async (expense) => {
    await API.post("/expenses", expense);
    loadExpenses();
  };

  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    loadExpenses();
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ADD EXPENSE */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
            <ExpenseForm onAdd={addExpense} />
          </div>

          {/* PIE CHART */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Category Chart</h2>
            <Charts expenses={expenses} />
          </div>
        </div>

        {/* EXPENSE LIST */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Expense List</h2>
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </div>
      </div>
    </div>
  );
}
