"use client";
import { MovieDB } from "@/context/interfaces/movieTypes";
import { useMovieContext } from "@/context/MovieContext";
import { useEffect } from "react";
import MovieListClient from "./MovieListClient";

interface MovieListProps {
  list: MovieDB[];
}

export default function MovieList({ list }: MovieListProps) {
  const { movieList, setMovieList } = useMovieContext();

  useEffect(() => {
    if (movieList.length === 0 && list.length > 0) {
      setMovieList(list);
      console.log("✅ setMovieList ejecutado.");
    } else if (list.length === 0) {
      console.log("⚠️ El prop list vino vacío, no se actualiza movieList.");
    }
  }, [list, movieList, setMovieList]);

  useEffect(() => {
    console.log("🎬 movieList actual:", movieList);
  }, [movieList]);

  return (
    <div className="flex flex-grow-1 h-full w-full">
      <MovieListClient list={movieList} />
    </div>
  );
}
