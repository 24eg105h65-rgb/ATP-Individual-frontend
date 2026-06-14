import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import API from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMovies: 0,
    totalGenres: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      alert("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-8 rounded-xl shadow">
            <h2 className="text-4xl font-bold text-red-600">
              {stats.totalUsers}
            </h2>
            <p className="text-gray-400 mt-2">Total Users</p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl shadow">
            <h2 className="text-4xl font-bold text-red-600">
              {stats.totalMovies}
            </h2>
            <p className="text-gray-400 mt-2">Total Movies</p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl shadow">
            <h2 className="text-4xl font-bold text-red-600">
              {stats.totalGenres}
            </h2>
            <p className="text-gray-400 mt-2">Total Genres</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;