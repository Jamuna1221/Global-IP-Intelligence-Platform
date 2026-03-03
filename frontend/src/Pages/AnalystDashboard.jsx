import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const BACKEND = "http://localhost:8081";
const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const STATUS_COLOR = {
  ACTIVE: "bg-green-600",
  PENDING: "bg-yellow-500",
  GRANTED: "bg-blue-600",
  DISCONTINUED: "bg-red-600",
};

export default function AnalystDashboard() {
  const navigate = useNavigate();

  /* ── Restore saved search state from sessionStorage ── */
  const saved = (() => {
    try { return JSON.parse(sessionStorage.getItem("analyst_search_state") || "null"); }
    catch { return null; }
  })();

  const [results, setResults] = useState(saved?.results || []);
  const [total, setTotal] = useState(saved?.total ?? null);
  const [searched, setSearched] = useState(saved?.searched || false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(saved?.page || 0);

  const [keyword, setKeyword] = useState(saved?.keyword || "");
  const [jurisdiction, setJurisdiction] = useState(saved?.jurisdiction || "");
  const [inventor, setInventor] = useState(saved?.inventor || "");
  const [assignee, setAssignee] = useState(saved?.assignee || "");
  const [status, setStatus] = useState(saved?.status || "");

  const token = localStorage.getItem("accessToken");

  /* ── Search ──────────────────────────────────────────────────── */
  const handleSearch = async (overridePage = 0) => {
    if (!keyword.trim()) return;
    setLoading(true);
    setSearched(true);
    setPage(overridePage);
    try {
      const params = new URLSearchParams({
        q: keyword.trim(),
        type: "PATENT",
        page: overridePage,
        size: 20,
      });
      if (jurisdiction) params.set("jurisdiction", jurisdiction);

      const res = await axios.get(`${BACKEND}/api/search?${params}`);
      setResults(res.data.results || []);
      setTotal(res.data.total ?? null);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setKeyword(""); setJurisdiction("");
    setInventor(""); setAssignee(""); setStatus("");
    setResults([]); setSearched(false);
    setTotal(null); setPage(0);
    sessionStorage.removeItem("analyst_search_state");
  };

  /* ── Save search state to sessionStorage whenever results change ── */
  useEffect(() => {
    if (results.length > 0) {
      sessionStorage.setItem("analyst_search_state", JSON.stringify({
        keyword, jurisdiction, inventor, assignee, status, page, results, total, searched
      }));
    }
  }, [results]);

  /* ── Client-side filter ── */
  const filteredResults = results.filter(r =>
    (inventor === "" || r.inventors?.some(i => i.toLowerCase().includes(inventor.toLowerCase()))) &&
    (assignee === "" || r.applicants?.some(a => a.toLowerCase().includes(assignee.toLowerCase()))) &&
    (status === "" || r.patentStatus === status)
  );

  /* ── Unique statuses from current results ── */
  const uniqueStatuses = [...new Set(results.map(r => r.patentStatus).filter(Boolean))].sort();

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };


  /* ── Chart data from filteredResults ── */
  const statusChart = Object.entries(
    filteredResults.reduce((acc, r) => {
      const s = r.patentStatus || "UNKNOWN";
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const jurisdictionChart = Object.entries(
    filteredResults.reduce((acc, r) => {
      const j = r.jurisdiction || "?";
      acc[j] = (acc[j] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  /* ── CSV Export ── */
  const downloadReport = () => {
    if (!filteredResults.length) { alert("No data to export"); return; }
    const headers = ["Title", "Applicants", "Inventors", "Status", "Jurisdiction", "Published", "Doc Number"];
    const rows = filteredResults.map(r => [
      `"${r.title}"`,
      `"${r.applicants?.join("; ")}"`,
      `"${r.inventors?.join("; ")}"`,
      r.patentStatus,
      r.jurisdiction,
      r.datePublished,
      r.docNumber,
    ].join(","));
    const blob = new Blob([headers.join(",") + "\n" + rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ip_analyst_report.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 md:px-12 py-10">

      {/* ── HEADER ── */}
      <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-indigo-400">Analyst Dashboard</h1>
        <div className="flex gap-4">
          <button onClick={downloadReport}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow transition">
            Download CSV
          </button>
          <button onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow transition">
            Logout
          </button>
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div className="bg-slate-800 p-6 rounded-xl mb-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Keyword (e.g. nanotechnology)"
            value={keyword} onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch(0)}
            className="bg-slate-700 p-2 rounded md:col-span-2"
          />
          <select value={jurisdiction} onChange={e => setJurisdiction(e.target.value)}
            className="bg-slate-700 p-2 rounded">
            <option value="">All Jurisdictions</option>
            <option value="US">US</option>
            <option value="IN">IN</option>
            <option value="CN">CN</option>
            <option value="EP">EP</option>
            <option value="WO">WO (PCT)</option>
            <option value="KR">KR</option>
            <option value="JP">JP</option>
            <option value="DE">DE</option>
            <option value="GB">GB</option>
          </select>
        </div>

        {/* Client-side filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <input type="text" placeholder="Filter by Inventor"
            value={inventor} onChange={e => setInventor(e.target.value)}
            className="bg-slate-700 p-2 rounded" />
          <input type="text" placeholder="Filter by Assignee / Applicant"
            value={assignee} onChange={e => setAssignee(e.target.value)}
            className="bg-slate-700 p-2 rounded" />
          <select value={status} onChange={e => setStatus(e.target.value)}
            className="bg-slate-700 p-2 rounded">
            <option value="">All Statuses</option>
            {uniqueStatuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 mt-4">
          <button onClick={() => handleSearch(0)} disabled={loading || !keyword.trim()}
            className="bg-indigo-600 px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50 transition">
            {loading ? "Searching…" : "Search"}
          </button>
          <button onClick={handleClear}
            className="border border-gray-500 px-6 py-2 rounded hover:bg-slate-700 transition">
            Clear
          </button>
        </div>
      </div>

      {!searched && (
        <p className="text-gray-500 text-center mb-8">
          Search for patents to see analytics and the data table.
        </p>
      )}

      {/* ── CHARTS (only when we have results) ── */}
      {results.length > 0 && (
        <>
          <p className="text-gray-400 text-sm mb-6">
            Showing {filteredResults.length} of {results.length} results
            {total !== null && ` (${total.toLocaleString()} total from Lens.org)`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
              <h3 className="mb-4 text-indigo-400 font-semibold">Status Distribution</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={statusChart} dataKey="value" nameKey="name" outerRadius={100} label>
                    {statusChart.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip /><Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
              <h3 className="mb-4 text-indigo-400 font-semibold">Jurisdiction Distribution</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={jurisdictionChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" /><YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── TABLE ── */}
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg overflow-x-auto mb-6">
            <table className="w-full table-fixed text-sm">
              <thead>
                <tr className="border-b border-slate-600 text-gray-400">
                  <th className="text-left py-3 px-4 w-2/5">Title</th>
                  <th className="text-left py-3 px-4 w-1/5">Applicant</th>
                  <th className="text-left py-3 px-4 w-1/8">Status</th>
                  <th className="text-left py-3 px-4 w-1/8">Jurisdiction</th>
                  <th className="text-left py-3 px-4 w-1/8">Published</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map(r => (
                  <tr key={r.lensId}
                    onClick={() => navigate(`/assets/${r.lensId}`, { state: { from: "ANALYST" } })}
                    className="border-b border-slate-700 hover:bg-slate-700 transition cursor-pointer">
                    <td className="py-3 px-4 text-indigo-400 hover:underline line-clamp-2">{r.title}</td>
                    <td className="py-3 px-4 text-gray-300 truncate">{r.applicants?.[0] || "—"}</td>
                    <td className="py-3 px-4">
                      <span className={`${STATUS_COLOR[r.patentStatus] || "bg-gray-600"} px-2 py-0.5 rounded text-xs text-white`}>
                        {r.patentStatus || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-4">{r.jurisdiction}</td>
                    <td className="py-3 px-4 text-gray-400">{r.datePublished}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── PAGINATION ── */}
          <div className="flex justify-center gap-4">
            <button disabled={page === 0 || loading} onClick={() => handleSearch(page - 1)}
              className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-40 transition">
              ← Prev
            </button>
            <span className="px-4 py-2 text-gray-400">Page {page + 1}</span>
            <button disabled={results.length < 20 || loading} onClick={() => handleSearch(page + 1)}
              className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-40 transition">
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}