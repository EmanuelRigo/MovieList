"use client";
import Image from "next/image";
import React from "react";
import { useMovieContext } from "@/context/MovieContext";
import { FaFilm } from "react-icons/fa"; // Importa el ícono de react-icons

const CardMovieViewer: React.FC = () => {
  const { movie } = useMovieContext();

  const myLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  if (!movie) {
    return (
      <div className="flex flex-col h-full justify-between">
        {/* Contenedor para el ícono */}
        <div className="relative aspect-h-6-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
          <FaFilm className="text-neutral-500 dark:text-neutral-400 text-6xl" />
        </div>

        {/* Contenedor para el mensaje */}
        <div className="flex flex-col flex-grow justify-between pt-4">
          <div>
            <h3 className="text-black dark:text-white pt-4 lg:pt-0 pb-2 font-bold text-center">
              Movie
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full  justify-between bg-green-500">
      {/* Imagen */}
      <div className="relative aspect-h-6-9 rounded-lg shrink-0 1">
        {movie._id.poster_path ? (
          <Image
            loader={myLoader}
            src={movie._id.poster_path || ""}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            alt={movie._id.title || "Movie Poster"}
            className="rounded-lg"
          />
        ) : (
          <div className="bg-neutral-500">
            <p>no image</p>
          </div>
        )}
      </div>

      <div className="flex flex-col  bg-yellow-500 min-h-0 shrink-0 2">
        <h3 className="text-black dark:text-white pt-4 lg:pt-0 pb-2 font-bold">
          {movie._id.title}
        </h3>
        <div className="flex justify-between text-sm mb-2 text-black dark:text-neutral-200">
          <p>{movie._id.release_date?.split("T")[0]}</p>
          <p>{movie._id.runtime} min</p>
        </div>
      </div>
      {/* Overview con scroll interno */}
      <div className="overflow-y-auto min-h-0 scrollbar-hidden bg-pink-500 shrink-[2] grow-[2] 3">
        <p className="text-xs text-black dark:text-white p-2">
          {movie._id.overview}
        </p>
      </div>

      {/* Formatos */}
      <div className="flex items-center justify-evenly bg-neutral-100 dark:bg-neutral-800 rounded-lg py-2 text-sm mt-2 shrink-0 4">
        <div
          className={`flex items-center p-2 px-4 rounded-lg bg-neutral-300 dark:bg-neutral-950 border-neutral-100 ${
            movie.formats.vhs
              ? "text-neutral-900 dark:text-neutral-300"
              : "text-neutral-400 dark:text-neutral-700"
          }`}
        >
          <span>VHS</span>
        </div>
        <div
          className={`flex items-center p-2 px-4 mx-1 rounded-lg bg-neutral-300 dark:bg-neutral-950 border-neutral-100 ${
            movie.formats.dvd
              ? "text-neutral-900 dark:text-neutral-300"
              : "text-neutral-400 dark:text-neutral-700"
          }`}
        >
          <span>DVD</span>
        </div>
        <div
          className={`flex items-center p-2 px-4 rounded-lg bg-neutral-300 dark:bg-neutral-950 border-neutral-100 ${
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
