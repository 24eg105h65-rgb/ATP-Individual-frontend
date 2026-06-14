import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginAdmin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/admin/login", formData);

      // Important: remove old user data
      localStorage.removeItem("user");

      // Save admin data
      localStorage.setItem("admin", JSON.stringify(res.data));

      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-4">
      <form
        onSubmit={loginAdmin}
        className="bg-gray-900 text-white w-full max-w-xl p-10 rounded-xl shadow-xl relative"
      >
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="absolute top-5 left-5 bg-gray-800 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Back
        </button>

        <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
          Admin Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-4 mb-5 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600 text-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-4 mb-5 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600 text-lg"
        />

        <button
          type="submit"
          className="w-full bg-red-600 py-4 rounded font-semibold hover:bg-red-700 text-lg"
        >
          Login as Admin
        </button>

        
      </form>
    </div>
  );
}

export default AdminLogin;