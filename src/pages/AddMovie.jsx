import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import API from "../services/api";

function AddMovie() {
  const genreOptions = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Adventure",
    "Animation",
    "Crime",
  ];

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    genre: [],
    rating: "",
    releaseYear: "",
    posterUrl: "",
    language: "",
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;

    if (selectedGenre && !movie.genre.includes(selectedGenre)) {
      setMovie({
        ...movie,
        genre: [...movie.genre, selectedGenre],
      });
    }
  };

  const removeGenre = (genreName) => {
    setMovie({
      ...movie,
      genre: movie.genre.filter((g) => g !== genreName),
    });
  };

  const addMovie = async (e) => {
    e.preventDefault();

    if (movie.genre.length === 0) {
      alert("Please select at least one genre");
      return;
    }

    try {
      await API.post("/movies", movie);

      alert("Movie added successfully");

      setMovie({
        title: "",
        description: "",
        genre: [],
        rating: "",
        releaseYear: "",
        posterUrl: "",
        language: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add movie");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Add New Movie
          </h1>
          <p className="text-gray-400">
            Add movie details here. Users will see these movies based on their
            selected genres.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <form
            onSubmit={addMovie}
            className="lg:col-span-2 bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800"
          >
            <h2 className="text-2xl font-bold mb-6">Movie Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-300">Movie Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Example: Interstellar"
                  value={movie.title}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-300">Description</label>
                <textarea
                  name="description"
                  placeholder="Write a short description about the movie..."
                  value={movie.description}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-red-600 h-32 resize-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">Genre</label>
                <select
                  onChange={handleGenreChange}
                  defaultValue=""
                  className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="" disabled>
                    Select Genre
                  </option>

                  {genreOptions.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-300">Language</label>
                <input
                  type="text"
                  name="language"
                  placeholder="Example: English"
                  value={movie.language}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="md:col-span-2">
                {movie.genre.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genre.map((genre) => (
                      <span
                        key={genre}
                        className="bg-red-600 px-4 py-2 rounded-full text-sm flex items-center gap-2"
                      >
                        {genre}
                        <button
                          type="button"
                          onClick={() => removeGenre(genre)}
                          className="text-white font-bold hover:text-gray-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-300">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  name="rating"
                  placeholder="Example: 8.6"
                  value={movie.rating}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">Release Year</label>
                <input
                  type="number"
                  name="releaseYear"
                  placeholder="Example: 2014"
                  value={movie.releaseYear}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-300">
                  Poster Image URL
                </label>
                <input
                  type="text"
                  name="posterUrl"
                  placeholder="Paste movie poster image URL"
                  value={movie.posterUrl}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-red-600 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition"
            >
              Add Movie
            </button>
          </form>

          {/* Preview Section */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800 h-fit">
            <h2 className="text-2xl font-bold mb-5 text-red-600">
              Movie Preview
            </h2>

            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <img
                src={
                  movie.posterUrl ||
                  "https://via.placeholder.com/300x420?text=Movie+Poster"
                }
                alt="Movie Preview"
                className="w-full h-80 object-cover"
              />

              <div className="p-5">
                <h3 className="text-2xl font-bold mb-2">
                  {movie.title || "Movie Title"}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {movie.description ||
                    "Movie description will appear here after you type it."}
                </p>

                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-semibold text-white">Genre:</span>{" "}
                  {movie.genre.length > 0
                    ? movie.genre.join(", ")
                    : "Not selected"}
                </p>

                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-semibold text-white">Rating:</span>{" "}
                  {movie.rating || "N/A"}
                </p>

                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-semibold text-white">Year:</span>{" "}
                  {movie.releaseYear || "N/A"}
                </p>

                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">Language:</span>{" "}
                  {movie.language || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddMovie;