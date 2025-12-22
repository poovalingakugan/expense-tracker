import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Expense Tracker
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Secure login with JWT
        </p>
      </form>
    </div>
  );
}
