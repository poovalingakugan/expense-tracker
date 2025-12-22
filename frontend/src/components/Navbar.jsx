export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center bg-indigo-600 text-white px-6 py-4">
      <h1 className="text-xl font-bold">Expense Tracker</h1>
      <button
        onClick={logout}
        className="bg-white text-indigo-600 px-4 py-1 rounded-md font-semibold hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
}
