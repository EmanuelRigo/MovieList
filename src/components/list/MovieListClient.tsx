"use client";

import { useEffect, useRef } from "react";
import { CardRow } from "./CardRow";
import { MovieDB } from "@/context/interfaces/movieTypes";
import { useMovieContext } from "@/context/MovieContext";
import { FaFilm } from "react-icons/fa";

interface MovieListClientProps {
  list: MovieDB[];
}

const MovieListClient: React.FC<MovieListClientProps> = ({ list }) => {
  const { movieList, setMovieList } = useMovieContext();
  const movieRows = useRef<(HTMLDivElement | null)[]>([]);

  console.log("🔄 MovieListClient renderizado.");

  // Inicializar movieList solo si está vacío
  useEffect(() => {
    console.log("📋 Ejecutando useEffect de carga de lista.");
    if (movieList.length === 0 && list.length > 0) {
      setMovieList(list);
      console.log("✅ setMovieList ejecutado con lista inicial.");
    } else if (list.length === 0) {
      console.log("⚠️ Prop list vino vacío, no se actualiza movieList.");
    }
  }, [list, movieList, setMovieList]);

  // Debug: ver cambios en movieList
  useEffect(() => {
    console.log("🎬 movieList actual:", movieList);
  }, [movieList]);

  return (
    <div className="relative h-full w-full flex-grow scrollbar-hidden overflow-auto scroll-smooth scroll-duration-600">
      <div className="w-full h-full absolute">
        {movieList.length > 0 ? (
          movieList.map((element, index) => (
            <div
              key={element._id._id}
              ref={(el) => {
                movieRows.current[index] = el;
              }}
            >
              <CardRow movieProp={element} index={index} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border-2 border-neutral-300 dark:border-neutral-800">
            <FaFilm className="text-neutral-500 dark:text-neutral-400 text-6xl mb-4" />
            <p className="text-black dark:text-white text-lg font-bold">
              No hay películas disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieListClient;
