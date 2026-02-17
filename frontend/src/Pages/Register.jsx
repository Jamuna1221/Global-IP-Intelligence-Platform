import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Registered Successfully!");

    if (form.role === "ADMIN") navigate("/admin");
    else if (form.role === "ANALYST") navigate("/analyst");
    else navigate("/user");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border rounded"
          required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 border rounded"
          required
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <select
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ANALYST">Analyst</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
