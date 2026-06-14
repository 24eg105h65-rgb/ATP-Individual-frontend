import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, type }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (type === "admin") {
    if (admin && admin.token) {
      return children;
    }

    return <Navigate to="/login" replace />;
  }

  if (user && user.token) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;