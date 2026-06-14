import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import API from "../services/api";

function AdminProfile() {
  const [admin, setAdmin] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const fetchAdminProfile = async () => {
    try {
      const res = await API.get("/admin/profile");
      setAdmin(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load admin profile");
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      await API.put("/admin/change-password", passwordData);

      alert("Admin password changed successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Password change failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-red-600 mb-8">
          Admin Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Admin Details */}
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Account Details</h2>

            {admin && (
              <>
                <div className="mb-5">
                  <p className="text-gray-400 text-sm">Admin Email</p>
                  <p className="text-xl font-semibold">{admin.email}</p>
                </div>

                <div className="mb-5">
                  <p className="text-gray-400 text-sm">Role</p>
                  <p className="text-xl font-semibold">Admin</p>
                </div>

                <div className="mb-5">
                  <p className="text-gray-400 text-sm">Account Created</p>
                  <p className="text-xl font-semibold">
                    {admin.createdAt
                      ? new Date(admin.createdAt).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>

                <button
                  onClick={logout}
                  className="bg-red-600 px-6 py-3 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Change Password */}
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>

            <form onSubmit={changePassword}>
              <label className="block mb-2 text-gray-300">
                Current Password
              </label>

              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Current password"
                required
                className="w-full p-3 mb-5 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
              />

              <label className="block mb-2 text-gray-300">New Password</label>

              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="New password"
                required
                className="w-full p-3 mb-5 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
              />

              <label className="block mb-2 text-gray-300">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm password"
                required
                className="w-full p-3 mb-5 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
              />

              <button
                type="submit"
                className="bg-red-600 px-6 py-3 rounded font-semibold hover:bg-red-700"
              >
                Change Password
              </button>
            </form>
          </div>

          {/* Admin Options */}
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Admin Options</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Link
                to="/admin/dashboard"
                className="bg-gray-800 p-5 rounded-xl hover:bg-red-600 transition"
              >
                <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
                <p className="text-gray-400 text-sm">
                  View total users, movies, and genres.
                </p>
              </Link>

              <Link
                to="/admin/add-movie"
                className="bg-gray-800 p-5 rounded-xl hover:bg-red-600 transition"
              >
                <h3 className="text-xl font-semibold mb-2">Add Movie</h3>
                <p className="text-gray-400 text-sm">
                  Add new movies into MovieFlix.
                </p>
              </Link>

              <Link
                to="/admin/manage-movies"
                className="bg-gray-800 p-5 rounded-xl hover:bg-red-600 transition"
              >
                <h3 className="text-xl font-semibold mb-2">Manage Movies</h3>
                <p className="text-gray-400 text-sm">
                  Edit or delete movie details.
                </p>
              </Link>

              <Link
                to="/admin/manage-users"
                className="bg-gray-800 p-5 rounded-xl hover:bg-red-600 transition"
              >
                <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
                <p className="text-gray-400 text-sm">
                  View and delete registered users.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminProfile;