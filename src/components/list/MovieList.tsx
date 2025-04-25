import MovieListClient from "./MovieListClient";
import { getUserMovies } from "../widgets/movies.api";

async function loadData() {
  const res = await getUserMovies();
  const data = res.response.movies;
  console.log("🚀 ~ loadData ~ data:", data);
  return data;
}

export default async function MovieList() {
  const data = await loadData();

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
