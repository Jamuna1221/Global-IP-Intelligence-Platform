import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <span>
        Welcome {user.username} ({user.role}) |{" "}
      </span>

      {user.role === "USER" && <Link to="/user">User Dashboard</Link>}
      {user.role === "ANALYST" && <Link to="/analyst">Analyst Dashboard</Link>}
      {user.role === "ADMIN" && (
        <>
          <Link to="/admin">Admin Dashboard</Link> |{" "}
          <Link to="/requests">Requests</Link>
        </>
      )}

      {" | "}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
