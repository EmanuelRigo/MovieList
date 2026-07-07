"use client";

import { useEffect, useRef } from "react";
import { CardRow } from "./CardRow";
import { MovieDB } from "@/context/interfaces/movieTypes";
import { useMovieContext } from "@/context/MovieContext";
import { FaFilm } from "react-icons/fa";
import { GridCard } from "./GridCard";

interface MovieListClientProps {
  list: MovieDB[];
}

const MovieListClient: React.FC<MovieListClientProps> = ({ list }) => {
  const { movieList, setMovieList, viewMode } = useMovieContext();
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

  useEffect(() => {
    console.log("🎬 movieList actual:", movieList);
  }, [movieList]);

  return (
    <div className="relative h-full w-full flex-grow scrollbar-hidden">
      <div className="w-full h-full">
        {movieList.length > 0 ? (
          <div
            className={`
              p-2 rounded-2xl md:rounded-3xl
              bg-background-elevated border border-border-subtle
              h-full overflow-auto scroll-smooth scrollbar-hidden
              flex flex-col
              ${
                viewMode === "grid"
                  ? "grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-5 gap-3 content-start"
                  : "gap-1.5"
              }
            `}
          >
            {movieList.map((element, index) => (
              <div
                key={element._id._id}
                ref={(el) => {
                  movieRows.current[index] = el;
                }}
              >
                {viewMode === "list" ? (
                  <CardRow movieProp={element} index={index} />
                ) : (
                  <GridCard movieProp={element} index={index} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] h-full rounded-2xl md:rounded-3xl border border-border-subtle bg-surface-primary p-8">
            <FaFilm className="text-text-muted text-6xl mb-4" />
            <p className="text-text-primary text-lg font-semibold">
              No hay películas disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieListClient;
