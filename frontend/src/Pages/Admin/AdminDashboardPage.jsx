import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminDashboardPage() {

  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const u = await api.get("/api/admin/users");
    const p = await api.get("/api/admin/analysts/pending");

    setUsers(u.data);
    setPending(p.data);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-slate-800 p-6 rounded-xl">
        Total Users: {users.length}
      </div>

      <div className="bg-slate-800 p-6 rounded-xl">
        Pending Requests: {pending.length}
      </div>
    </div>
  );
}