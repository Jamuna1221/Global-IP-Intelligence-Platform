import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, saveAllUsers } from "../utils/auth";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const handleRegister = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = getAllUsers();

    const newUser = {
      username: form.username,
      email: form.email,
      password: form.password,
      role: form.role,
      photo: "",
    };

    saveAllUsers([...users, newUser]);

    alert("Registered successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          placeholder="Username"
          className="w-full mb-3 border p-2 rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 border p-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 border p-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-3 border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <select
          className="w-full mb-4 border p-2 rounded"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ANALYST">Analyst</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}
