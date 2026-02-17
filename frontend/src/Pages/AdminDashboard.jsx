import {
  getUser,
  getAllUsers,
  saveAllUsers,
  getRequests,
  removeRequest,
} from "../utils/auth";

export default function AdminDashboard() {
  const user = getUser();

  if (!user || user.role !== "ADMIN") {
    return <h2 className="text-center mt-20 text-xl">Access Denied</h2>;
  }

  const users = getAllUsers();
  const requests = getRequests();

  const approveRequest = (username) => {
    const updatedUsers = users.map((u) =>
      u.username === username ? { ...u, role: "ADMIN" } : u
    );

    saveAllUsers(updatedUsers);
    removeRequest(username);

    alert("User promoted to ADMIN");
    window.location.reload();
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Role Requests</h2>

        {requests.length === 0 && <p>No pending requests</p>}

        {requests.map((r, index) => (
          <div
            key={index}
            className="border p-4 mb-3 rounded flex justify-between"
          >
            <span>{r.username} wants ADMIN access</span>

            <button
              onClick={() => approveRequest(r.username)}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
