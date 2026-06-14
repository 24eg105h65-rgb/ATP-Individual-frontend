import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import API from "../services/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      alert("Failed to load users");
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-x-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Users</h1>

        <table className="w-full bg-gray-900 rounded-xl overflow-hidden">
          <thead className="bg-black text-red-600">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Selected Genres</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-700">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.selectedGenres?.join(", ")}</td>
                <td className="p-4">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-gray-400 mt-5">No users found.</p>
        )}
      </main>
    </div>
  );
}

export default ManageUsers;