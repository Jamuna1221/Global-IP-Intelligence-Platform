import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminUsersPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/api/admin/users");
    setUsers(res.data);
  };

  return (
    <table className="w-full bg-slate-800 rounded-xl">
      <thead>
        <tr>
          <th className="p-3 text-left">Username</th>
          <th className="p-3 text-left">Roles</th>
        </tr>
      </thead>

      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td className="p-3">{u.username}</td>
            <td className="p-3">{u.roles?.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}