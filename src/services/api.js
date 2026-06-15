import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: BACKEND_URL,
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const currentPath = window.location.pathname;

  if (currentPath.startsWith("/admin") && admin?.token) {
    req.headers.Authorization = `Bearer ${admin.token}`;
  } else if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;