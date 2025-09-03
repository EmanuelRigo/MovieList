"use client";
import Image from "next/image";
import React from "react";
import { useMovieContext } from "@/context/MovieContext";
import { FaFilm } from "react-icons/fa";

const CardMovieViewer: React.FC = () => {
  const { movie } = useMovieContext();

  if (!movie) {
    return (
      <div className="flex flex-col h-full justify-between">
        {/* Contenedor para el ícono */}
        <div className="relative aspect-[2/3] rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
          <FaFilm className="text-neutral-500 dark:text-neutral-400 text-6xl" />
        </div>

        {/* Contenedor para el mensaje */}
        <div className="flex flex-col flex-grow justify-between pt-4">
          <h3 className="text-black dark:text-white pt-4 lg:pt-0 pb-2 font-bold text-center">
            Movie
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Imagen */}
      <div className="relative rounded-lg shrink-0">
        {movie._id.poster_path ? (
          <Image
            key={movie._id.poster_path} // 🔑 fuerza el remount cuando cambia la película
            src={`https://image.tmdb.org/t/p/w500${movie._id.poster_path}`}
            alt={movie._id.title || "Movie Poster"}
            width={500}
            height={750}
            unoptimized
            className="rounded-lg object-cover opacity-0 transition-opacity duration-700 ease-in-out"
            onLoadingComplete={(img) => img.classList.remove("opacity-0")}
          />
        ) : (
          <div className="bg-neutral-500 h-[375px] flex items-center justify-center rounded-lg">
            <p className="text-white text-sm">no image</p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col min-h-0 shrink-0 pt-3">
        <h3 className="text-black dark:text-white pt-4 lg:pt-0 pb-2 font-bold">
          {movie._id.title}
        </h3>
        <div className="flex justify-between text-sm mb-2 text-black dark:text-neutral-200">
          <p>{movie._id.release_date?.split("T")[0]}</p>
          <p>{movie._id.runtime} min</p>
        </div>
      </div>

      {/* Overview con scroll interno */}
      <div className="overflow-y-auto min-h-0 scrollbar-hidden shrink-[2] grow-[2]">
        <p className="text-xs text-black dark:text-white">
          {movie._id.overview}
        </p>
      </div>

      {/* Formatos */}
      <div className="flex items-center justify-evenly bg-neutral-100 dark:bg-neutral-800 rounded-lg py-2 text-sm mt-2 shrink-0">
        <div
          className={`flex items-center p-2 px-4 rounded-lg bg-neutral-300 dark:bg-neutral-950 ${
            movie.formats.vhs
              ? "text-neutral-900 dark:text-neutral-300"
              : "text-neutral-400 dark:text-neutral-700"
          }`}
        >
          <span>VHS</span>
        </div>
        <div
          className={`flex items-center p-2 px-4 mx-1 rounded-lg bg-neutral-300 dark:bg-neutral-950 ${
            movie.formats.dvd
              ? "text-neutral-900 dark:text-neutral-300"
              : "text-neutral-400 dark:text-neutral-700"
          }`}
        >
          <span>DVD</span>
        </div>
        <div
          className={`flex items-center p-2 px-4 rounded-lg bg-neutral-300 dark:bg-neutral-950 ${
            movie.formats.bluray
              ? "text-neutral-900 dark:text-neutral-300"
              : "text-neutral-400 dark:text-neutral-700"
          }`}
        >
          <span>BLU RAY</span>
        </div>
      </div>
    </div>
  );
};

export default CardMovieViewer;
