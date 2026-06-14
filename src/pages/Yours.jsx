import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

function Yours() {
  const [movies, setMovies] = useState([]);
  const [userName, setUserName] = useState("");

  const fetchYours = async () => {
    try {
      const res = await API.get("/recommendations/yours");
      setMovies(res.data);
    } catch (error) {
      alert("Failed to load your movies");
    }
  };

  const getUserName = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.name) {
      setUserName(user.name);
    }
  };

  useEffect(() => {
    getUserName();
    fetchYours();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-950 text-white px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">
          {userName}, these are your personal taste
        </h1>

        <p className="text-gray-400 mb-8">
          Movies selected based on your favourite genres.
        </p>

        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">
            No movies found for your selected genres.
          </p>
        )}
      </div>
    </>
  );
}

export default Yours;