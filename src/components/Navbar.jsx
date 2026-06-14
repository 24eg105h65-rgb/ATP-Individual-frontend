import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h2 className="text-2xl font-bold text-red-600">MovieFlix</h2>

      <div className="flex items-center gap-6">
        <Link className="hover:text-red-500" to="/home">
          Home
        </Link>
        <Link className="hover:text-red-500" to="/yours">
          Yours
        </Link>
        <Link className="hover:text-red-500" to="/suggestions">
          Suggestions
        </Link>
        <Link className="hover:text-red-500" to="/profile">
          Profile
        </Link>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
