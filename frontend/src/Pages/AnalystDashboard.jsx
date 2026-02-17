import { getUser, saveRequest } from "../utils/auth";

export default function AnalystDashboard() {
  const user = getUser();

  const handleRequestAdmin = () => {
    saveRequest({
      username: user.username,
      requestedRole: "ADMIN",
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-indigo-600">Analyst Dashboard</h1>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Upload IP Data</h2>
        <input className="border p-2 w-full mb-4 rounded" />
        <textarea className="border p-2 w-full mb-4 rounded" />
        <button className="bg-indigo-600 text-white px-6 py-2 rounded">
          Submit
        </button>
      </div>

      <div className="mt-8">
        <button
          onClick={handleRequestAdmin}
          className="bg-yellow-500 text-white px-6 py-2 rounded"
        >
          Request Admin Access
        </button>
      </div>
    </div>
  );
}
