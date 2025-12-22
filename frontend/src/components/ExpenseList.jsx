export default function ExpenseList({ expenses, onDelete }) {
  if (!expenses.length) {
    return (
      <p className="text-center text-gray-500">
        No expenses added yet
      </p>
    );
  }

  return (
    <ul className="divide-y">
      {expenses.map((e) => (
        <li
          key={e._id}
          className="flex justify-between items-center py-3"
        >
          <div>
            <p className="font-medium">{e.title}</p>
            <p className="text-sm text-gray-500">{e.category}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold">₹{e.amount}</span>
            <button
              onClick={() => onDelete(e._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
