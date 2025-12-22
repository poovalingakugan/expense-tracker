import { useState } from "react";

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const submit = () => {
    if (!title || !amount || !category) return;

    onAdd({
      title,
      amount: Number(amount),
      category,
    });

    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <div className="space-y-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full border p-2 rounded"
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Food / Travel / Entertainment"
        className="w-full border p-2 rounded"
      />

      <button
        onClick={submit}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Add Expense
      </button>
    </div>
  );
}
