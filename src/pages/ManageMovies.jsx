import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import API from "../services/api";

function ManageMovies() {
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

  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    genre: [],
    rating: "",
    releaseYear: "",
    posterUrl: "",
    language: "",
    cast: "",
  });

  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies");
      setMovies(res.data);
    } catch (error) {
      alert("Failed to load movies");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const deleteMovie = async (id) => {
    const confirmDelete = window.confirm("Delete this movie?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/movies/${id}`);
      fetchMovies();
    } catch (error) {
      alert("Failed to delete movie");
    }
  };

  const openEditForm = (movie) => {
    setEditingMovie(movie._id);

    setEditForm({
      title: movie.title || "",
      description: movie.description || "",
      genre: movie.genre || [],
      rating: movie.rating || "",
      releaseYear: movie.releaseYear || "",
      posterUrl: movie.posterUrl || "",
      language: movie.language || "",
      cast: movie.cast ? movie.cast.join(", ") : "",
    });
  };

  const closeEditForm = () => {
    setEditingMovie(null);

    setEditForm({
      title: "",
      description: "",
      genre: [],
      rating: "",
      releaseYear: "",
      posterUrl: "",
      language: "",
      cast: "",
    });
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;

    if (selectedGenre && !editForm.genre.includes(selectedGenre)) {
      setEditForm({
        ...editForm,
        genre: [...editForm.genre, selectedGenre],
      });
    }
  };

  const removeGenre = (genreName) => {
    setEditForm({
      ...editForm,
      genre: editForm.genre.filter((g) => g !== genreName),
    });
  };

  const updateMovie = async (e) => {
    e.preventDefault();

    if (editForm.genre.length === 0) {
      alert("Please select at least one genre");
      return;
    }

    try {
      await API.put(`/movies/${editingMovie}`, editForm);

      alert("Movie updated successfully");

      closeEditForm();
      fetchMovies();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update movie");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-x-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Movies</h1>

        {editingMovie && (
          <div className="bg-gray-900 p-8 rounded-xl mb-8 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 text-red-600">
              Edit Movie
            </h2>

            <form onSubmit={updateMovie}>
              <input
                type="text"
                name="title"
                placeholder="Movie Title"
                value={editForm.title}
                onChange={handleChange}
                required
                className="w-full p-3 mb-4 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={editForm.description}
                onChange={handleChange}
                required
                className="w-full p-3 mb-4 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600 h-28"
              />

              <select
                onChange={handleGenreChange}
                defaultValue=""
                className="w-full p-3 mb-4 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-600"
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

              {editForm.genre.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {editForm.genre.map((genre) => (
                    <span
                      key={genre}
                      className="bg-red-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {genre}

                      <button
                        type="button"
                        onClick={() => removeGenre(genre)}
                        className="font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <input
                type="number"
                step="0.1"
                name="rating"
                placeholder="Rating"
                value={editForm.rating}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
              />

              <input
                type="number"
                name="releaseYear"
                placeholder="Release Year"
                value={editForm.releaseYear}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
              />

              <input
                type="text"
                name="posterUrl"
                placeholder="Poster Image URL"
                value={editForm.posterUrl}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
              />

              <input
                type="text"
                name="language"
                placeholder="Language"
                value={editForm.language}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
              />

              <input
                type="text"
                name="cast"
                placeholder="Cast Example: Actor 1, Actor 2"
                value={editForm.cast}
                onChange={handleChange}
                className="w-full p-3 mb-4 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-red-600"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-red-600 px-6 py-3 rounded font-semibold hover:bg-red-700"
                >
                  Update Movie
                </button>

                <button
                  type="button"
                  onClick={closeEditForm}
                  className="bg-gray-700 px-6 py-3 rounded font-semibold hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <table className="w-full bg-gray-900 rounded-xl overflow-hidden">
          <thead className="bg-black text-red-600">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Genre</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-left">Year</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id} className="border-b border-gray-700">
                <td className="p-4">{movie.title}</td>
                <td className="p-4">{movie.genre?.join(", ")}</td>
                <td className="p-4">{movie.rating}</td>
                <td className="p-4">{movie.releaseYear}</td>
                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => openEditForm(movie)}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMovie(movie._id)}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {movies.length === 0 && (
          <p className="text-gray-400 mt-5">No movies added yet.</p>
        )}
      </main>
    </div>
  );
}

export default ManageMovies;