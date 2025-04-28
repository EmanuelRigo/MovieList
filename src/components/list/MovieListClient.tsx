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
  const { movieList, setMovieList, movie, setMovie } = useMovieContext();
  const movieRows = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    console.log("🚀 ~ props list:", list);

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

  // Escuchar las teclas ArrowDown y ArrowUp para cambiar de película
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!movieList || movieList.length === 0) return;

      const currentIndex = movieList.findIndex(
        (m) => m._id._id === movie?._id._id
      );

      if (e.key === "ArrowDown") {
        const nextIndex = Math.min(currentIndex + 1, movieList.length - 1);
        if (nextIndex !== currentIndex) {
          setMovie(movieList[nextIndex]);
          movieRows.current[nextIndex]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }

      if (e.key === "ArrowUp") {
        const prevIndex = Math.max(currentIndex - 1, 0);
        if (prevIndex !== currentIndex) {
          setMovie(movieList[prevIndex]);
          movieRows.current[prevIndex]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movieList, setMovie]);

  console.log("🚀 ~ list:", list);
  return (
    <div className="relative flex-grow scrollbar-hidden overflow-auto scroll-smooth scroll-duration-600 ">
      <div className="w-full h-full absolute">
        {movieList && movieList.length > 0 ? (
          movieList.map((element, index) => (
            <div
              key={element._id._id}
              ref={(el) => {
                if (el) movieRows.current[index] = el;
              }}
            >
              <CardRow movieProp={element} index={index} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border-2 border-neutral-300 dark:border-neutral-800 ">
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
