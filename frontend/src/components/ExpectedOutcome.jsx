export default function ExpectedOutcome() {
  return (
    <div className="bg-white p-10 rounded-xl shadow text-center">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        Expense Tracker Dashboard
      </h1>

      <p className="text-gray-700 text-lg mb-6">
        A personal finance dashboard with charts and monthly history.
      </p>

      <ul className="text-left max-w-xl mx-auto space-y-3 text-gray-600">
        <li>• Track monthly expenses easily</li>
        <li>• Categorize expenses (Food, Travel, etc.)</li>
        <li>• Visualize spending using charts</li>
        <li>• View month-wise expense history</li>
        <li>• Secure user authentication</li>
      </ul>

      <p className="mt-8 text-sm text-gray-500">
        Start by adding your first expense to see insights.
      </p>
    </div>
  );
}
