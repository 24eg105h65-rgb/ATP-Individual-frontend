function MovieCard({ movie }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      <img
        src={
          movie.posterUrl ||
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=400&fit=crop"
        }
        alt={movie.title}
        className="w-full h-72 object-cover bg-gray-800"
        onError={(e) => {
          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect fill="%23374151" width="300" height="400"/%3E%3Ctext x="50%" y="50%" font-size="16" fill="%239CA3AF" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
        }}
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