import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function GenreSelection() {
  const genres = [
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

  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const saveGenres = async () => {
    if (selectedGenres.length === 0) {
      alert("Please select at least one genre");
      return;
    }

    try {
      await API.put("/users/genres", { selectedGenres });

      const user = JSON.parse(localStorage.getItem("user"));
      user.selectedGenres = selectedGenres;
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/yours");
    } catch (error) {
      alert("Failed to save genres");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Select Your Favourite Genres
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {genres.map((genre) => (
          <div
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`p-8 text-center rounded-xl cursor-pointer border-2 transition ${
              selectedGenres.includes(genre)
                ? "bg-red-600 border-red-600"
                : "bg-gray-900 border-gray-700 hover:border-red-600"
            }`}
          >
            <p className="font-semibold">{genre}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={saveGenres}
          className="bg-red-600 px-10 py-3 rounded font-semibold hover:bg-red-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default GenreSelection;