import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">
          Global IP Intelligence
        </h1>

        <div className="space-x-6">
          <Link to="/login" className="hover:text-indigo-600">
            Login
          </Link>
          <Link to="/register" className="hover:text-indigo-600">
            Register
          </Link>
          <Link to="/login" className="hover:text-indigo-600">
            Dashboard
          </Link>
        </div>
      </nav>

      <section className="text-center px-6 py-24">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Empowering Global Intellectual Property Insights
        </h2>

        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Analyze, track and manage intellectual property data securely.
        </p>

        <div className="space-x-4">
          <Link to="/register">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl hover:bg-indigo-100">
              Login Now
            </button>
          </Link>
        </div>
      </section>

      <footer className="bg-indigo-600 text-white text-center py-6">
        © 2026 Global IP Intelligence Platform
      </footer>
    </div>
  );
}
