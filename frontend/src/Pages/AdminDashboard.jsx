export default function AdminDashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-gray-100 p-6 rounded-xl">
        <h2 className="font-semibold mb-4">Pending Requests</h2>

        <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow mb-3">
          <span>Analyst Upload Request</span>
          <div>
            <button className="bg-green-600 text-white px-4 py-1 rounded mr-2">
              Approve
            </button>
            <button className="bg-red-600 text-white px-4 py-1 rounded">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
