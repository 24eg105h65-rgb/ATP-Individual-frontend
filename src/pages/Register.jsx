import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/register", formData);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/genres");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center px-4">
      <form
        onSubmit={registerHandler}
        className="bg-gray-900 text-white w-full max-w-md p-8 rounded-xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
        />

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

        <button className="w-full bg-red-600 py-3 rounded font-semibold hover:bg-red-700">
          Register
        </button>

        <p className="text-center text-gray-400 mt-5">
          Already have account?{" "}
          <Link to="/login" className="text-red-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;