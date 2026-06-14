import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");
      setUser(res.data);
      setName(res.data.name);
    } catch (error) {
      alert("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put("/users/profile", { name });

      const oldUser = JSON.parse(localStorage.getItem("user"));

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...oldUser,
          name: res.data.user.name,
          selectedGenres: res.data.user.selectedGenres,
        })
      );

      alert("Profile updated successfully");
      fetchProfile();
    } catch (error) {
      alert(error.response?.data?.message || "Profile update failed");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      await API.put("/users/change-password", passwordData);

      alert("Password changed successfully");

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
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-950 text-white px-8 py-10">
        <h1 className="text-4xl font-bold text-red-600 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Details */}
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Account Details</h2>

            {user && (
              <>
                <div className="mb-5">
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-xl font-semibold">{user.name}</p>
                </div>

                <div className="mb-5">
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-xl font-semibold">{user.email}</p>
                </div>

                <div className="mb-5">
                  <p className="text-gray-400 text-sm">Selected Genres</p>

                  {user.selectedGenres && user.selectedGenres.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.selectedGenres.map((genre) => (
                        <span
                          key={genre}
                          className="bg-red-600 px-3 py-1 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-300">No genres selected</p>
                  )}
                </div>

                <div className="flex gap-4 mt-6">
                  <Link to="/genres">
                    <button className="bg-red-600 px-5 py-3 rounded hover:bg-red-700">
                      Change Genres
                    </button>
                  </Link>

                  <button
                    onClick={logout}
                    className="bg-gray-700 px-5 py-3 rounded hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Edit Profile */}
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            <form onSubmit={updateProfile}>
              <label className="block mb-2 text-gray-300">Update Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new name"
                required
                className="w-full p-3 mb-5 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
              />

              <button
                type="submit"
                className="bg-red-600 px-6 py-3 rounded font-semibold hover:bg-red-700"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>

            <form
              onSubmit={changePassword}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              <div>
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
                  className="w-full p-3 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="New password"
                  required
                  className="w-full p-3 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
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
                  className="w-full p-3 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="bg-red-600 px-6 py-3 rounded font-semibold hover:bg-red-700"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>

          {/* More Options */}
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">More Options</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Link
                to="/home"
                className="bg-gray-800 p-5 rounded-xl hover:bg-red-600 transition"
              >
                <h3 className="text-xl font-semibold mb-2">Browse Movies</h3>
                <p className="text-gray-400 text-sm">
                  View all movies available in MovieFlix.
                </p>
              </Link>

              <Link
                to="/yours"
                className="bg-gray-800 p-5 rounded-xl hover:bg-red-600 transition"
              >
                <h3 className="text-xl font-semibold mb-2">Your Movies</h3>
                <p className="text-gray-400 text-sm">
                  View movies based on your selected genres.
                </p>
              </Link>

              <Link
                to="/suggestions"
                className="bg-gray-800 p-5 rounded-xl hover:bg-red-600 transition"
              >
                <h3 className="text-xl font-semibold mb-2">Suggestions</h3>
                <p className="text-gray-400 text-sm">
                  Explore movies from other genres.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile; 