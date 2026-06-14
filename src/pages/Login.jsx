import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
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

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", formData);

      // Important: remove old admin data
      localStorage.removeItem("admin");

      // Save user data
      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.selectedGenres.length === 0) {
        navigate("/genres");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-4">
      <form
        onSubmit={loginHandler}
        className="bg-gray-900 text-white w-full max-w-md p-8 rounded-xl shadow-xl"
      >
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex-1 bg-red-600 py-3 rounded font-semibold hover:bg-red-700"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="flex-1 bg-gray-800 py-3 rounded font-semibold hover:bg-red-600"
          >
            Register
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          MovieFlix Login
        </h1>

        <p className="mb-3 font-semibold">Login as:</p>

        <div className="flex gap-4 mb-6">
          <button
            type="button"
            className="flex-1 py-3 rounded font-semibold border bg-red-600 border-red-600"
          >
            User
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/login")}
            className="flex-1 py-3 rounded font-semibold border bg-gray-800 border-gray-700 hover:bg-red-600"
          >
            Admin
          </button>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          type="submit"
          className="w-full bg-red-600 py-3 rounded font-semibold hover:bg-red-700"
        >
          Login
        </button>

        <p className="text-center text-gray-400 mt-5">
          New user?{" "}
          <Link to="/register" className="text-red-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;