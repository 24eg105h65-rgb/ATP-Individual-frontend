import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import GenreSelection from "./pages/GenreSelection";
import Home from "./pages/Home";
import Yours from "./pages/Yours";
import Suggestions from "./pages/Suggestions";
import Profile from "./pages/Profile";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddMovie from "./pages/AddMovie";
import ManageMovies from "./pages/ManageMovies";
import ManageUsers from "./pages/ManageUsers";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProfile from "./pages/AdminProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/genres"
          element={
            <ProtectedRoute>
              <GenreSelection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/yours"
          element={
            <ProtectedRoute>
              <Yours />
            </ProtectedRoute>
          }
        />

        <Route
          path="/suggestions"
          element={
            <ProtectedRoute>
              <Suggestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute type="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-movie"
          element={
            <ProtectedRoute type="admin">
              <AddMovie />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-movies"
          element={
            <ProtectedRoute type="admin">
              <ManageMovies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-users"
          element={
            <ProtectedRoute type="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/profile"
  element={
    <ProtectedRoute type="admin">
      <AdminProfile />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;