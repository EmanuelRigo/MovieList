import MovieListClient from "./MovieListClient";
import { getUserMovies } from "../widgets/movies.api";

const res = await getUserMovies();
const data = res.response.movies;

export default function MovieList() {
  return (
    <div className="flex flex-grow-1  h-full ">
      <MovieListClient list={data} />
    </div>
  );
}
