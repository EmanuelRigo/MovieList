"use client"
import MovieListClient from "./MovieListClient";
import { useMovies } from "./useMovies";

export default function MovieList() {
  const { data, error, loading } = useMovies();

  if (loading) {
    return <div className="flex flex-grow-1 h-full lg:h-full items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex flex-grow-1 h-full lg:h-full">Error: {error}</div>;
  }

  return (
    <div className="flex flex-grow-1 h-full lg:h-full">
      <MovieListClient list={data} />
    </div>
  );
}