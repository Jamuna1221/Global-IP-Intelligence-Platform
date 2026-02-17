import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserDashboard from "./Pages/UserDashboard";
import AnalystDashboard from "./Pages/AnalystDashboard";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/analyst" element={<AnalystDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
