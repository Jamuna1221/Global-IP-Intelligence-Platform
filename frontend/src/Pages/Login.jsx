import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser, getAllUsers } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    const users = getAllUsers();
    const foundUser = users.find(
      (u) => u.username === form.username && u.password === form.password
    );

    if (!foundUser) {
      alert("Invalid credentials");
      return;
    }

    saveUser(foundUser);

    if (foundUser.role === "USER") navigate("/user");
    if (foundUser.role === "ANALYST") navigate("/analyst");
    if (foundUser.role === "ADMIN") navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 border p-2 rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 border p-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
