export default function AnalystDashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Analyst Dashboard</h1>

      <textarea
        placeholder="Upload / Update IP Details..."
        className="border p-3 rounded-lg w-full max-w-lg h-40"
      />

      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">
        Send Request to Admin
      </button>
    </div>
  );
}
