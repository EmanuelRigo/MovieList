import MovieListClient from "./MovieListClient";
import { getUserMovies } from "../widgets/movies.api";
import { MovieDB } from "@/context/interfaces/movieTypes";

export default async function MovieList() {
  let data: MovieDB[] = [];

  try {
    const res = await getUserMovies();
    data = res?.response?.movies ?? [];
  } catch (error) {
    console.error("Error loading movies:", error);
  }

  return (
    <div className="flex flex-grow-1 h-full">
      {data.length > 0 ? (
        <MovieListClient list={data} />
      ) : (
        <div className="text-gray-400 m-auto text-center">
          No movies found or failed to load.
        </div>
      )}
    </div>
  );
}
