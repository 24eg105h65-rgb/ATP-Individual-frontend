import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-black text-white p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-8">Admin</h2>

      <div className="flex flex-col gap-4">
        <Link
          className="bg-gray-900 px-4 py-3 rounded hover:bg-red-600"
          to="/admin/dashboard"
        >
          Dashboard
        </Link>

        <Link
          className="bg-gray-900 px-4 py-3 rounded hover:bg-red-600"
          to="/admin/add-movie"
        >
          Add Movie
        </Link>

        <Link
          className="bg-gray-900 px-4 py-3 rounded hover:bg-red-600"
          to="/admin/manage-movies"
        >
          Manage Movies
        </Link>

        <Link
          className="bg-gray-900 px-4 py-3 rounded hover:bg-red-600"
          to="/admin/manage-users"
        >
          Manage Users
        </Link>

        <Link
          className="bg-gray-900 px-4 py-3 rounded hover:bg-red-600"
          to="/admin/profile"
        >
          Profile
        </Link>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-3 rounded hover:bg-red-700 mt-4"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;