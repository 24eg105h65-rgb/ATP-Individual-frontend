import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

function Suggestions() {
  const [movies, setMovies] = useState([]);

  const fetchSuggestions = async () => {
    try {
      const res = await API.get("/recommendations/suggestions");
      setMovies(res.data);
    } catch (error) {
      alert("Failed to load suggestions");
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-950 text-white px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Explore Other Genres</h1>

        <p className="text-gray-400 mb-8">
          These movies are from genres you have not selected.
        </p>

        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No movies found from other genres.</p>
        )}
      </div>
    </>
  );
}

export default Suggestions;