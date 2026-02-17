export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex items-center gap-4 mb-8">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">Username: DemoUser</h2>
          <p className="text-gray-500">Role: User</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Search IP</h3>
        <input
          type="text"
          placeholder="Search IP..."
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
}
