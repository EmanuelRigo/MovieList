import MovieListClient from "./MovieListClient";
import { getUserMovies } from "../widgets/movies.api";

const res = await getUserMovies();
const data = res.response.movies;

export default function MovieList() {
  return (
    <div className="flex flex-grow-1 h-full">
      {data && data.length > 0 ? (
        <MovieListClient list={data} />
      ) : (
        <div className="text-gray-400 m-auto text-center">No movies found.</div>
      )}
    </div>
  );
}
