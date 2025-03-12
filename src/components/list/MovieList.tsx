"use client"
import MovieListClient from "./MovieListClient";
import { useMovies } from "./useMovies";

export default function MovieList() {
  const { data, error, loading } = useMovies();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen lg:h-full py-4">
      <MovieListClient list={data} />
    </div>
  );
}