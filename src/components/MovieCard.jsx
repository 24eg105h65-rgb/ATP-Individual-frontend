function MovieCard({ movie }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      <img
        src={
          movie.posterUrl ||
          "https://via.placeholder.com/300x400?text=Movie+Poster"
        }
        alt={movie.title}
        className="w-full h-72 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>

        <p className="text-gray-300 text-sm mb-3">{movie.description}</p>

        <p className="text-gray-400 text-sm">
          <span className="font-semibold text-white">Genre:</span>{" "}
          {movie.genre?.join(", ")}
        </p>

        <p className="text-gray-400 text-sm">
          <span className="font-semibold text-white">Rating:</span>{" "}
          {movie.rating}
        </p>

        <p className="text-gray-400 text-sm">
          <span className="font-semibold text-white">Year:</span>{" "}
          {movie.releaseYear}
        </p>

        <p className="text-gray-400 text-sm">
          <span className="font-semibold text-white">Language:</span>{" "}
          {movie.language}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;