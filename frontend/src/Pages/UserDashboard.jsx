import { getUser, saveRequest } from "../utils/auth";

export default function UserDashboard() {
  const user = getUser();

  const handleRequestAdmin = () => {
    saveRequest({
      username: user.username,
      requestedRole: "ADMIN",
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-indigo-600">
        Welcome {user.username}
      </h1>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Search IP</h2>

        <input
          type="text"
          placeholder="Search patent..."
          className="border p-2 w-full mb-4 rounded"
        />
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
