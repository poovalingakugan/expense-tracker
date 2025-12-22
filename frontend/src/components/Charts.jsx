import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b"];

export default function Charts({ expenses }) {
  if (!expenses.length) {
    return <p className="text-gray-500">No data to display</p>;
  }

  const summary = Object.values(
    expenses.reduce((acc, cur) => {
      acc[cur.category] = acc[cur.category] || {
        category: cur.category,
        total: 0,
      };
      acc[cur.category].total += cur.amount;
      return acc;
    }, {})
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={summary}
          dataKey="total"
          nameKey="category"
          label
        >
          {summary.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
