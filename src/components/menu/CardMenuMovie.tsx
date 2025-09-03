"use client";

import Image from "next/image";
import React from "react";
import { useMovieContext } from "@/context/MovieContext";
import { FaFilm } from "react-icons/fa"; // Importa un ícono de react-icons

const CardMenuMovie = () => {
  const { movie } = useMovieContext();

  // const myLoader = ({
  //   src,
  //   width,
  //   quality,
  // }: {
  //   src: string;
  //   width: number;
  //   quality?: number;
  // }) => {
  //   return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${
  //     quality || 75
  //   }`;
  // };

  if (movie && movie._id) {
    return (
      <div className="relative w-full rounded-lg overflow-hidden h-52 md:h-1/3 2xl:h-48">
        <div className="absolute inset-0">
          <Image
            key={movie._id.backdrop_path} // 🔑 fuerza el remount cuando cambia la película
            src={
              movie._id.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie._id.backdrop_path}`
                : "/images/default-backdrop.jpg"
            }
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            alt={movie._id.title || "Movie Poster"}
            unoptimized
            className="rounded-lg object-cover opacity-0 transition-opacity duration-700 ease-in-out"
            onLoadingComplete={(img) => img.classList.remove("opacity-0")}
          />
        </div>
        <div className="absolute bottom-0 w-full bg-neutral-100 bg-opacity-70 dark:bg-black dark:bg-opacity-50 dark:text-white p-2 ps-3">
          <h2 className="text-xl xl:text-xl mb-1">
            {movie._id.title || "Unknown Title"}
          </h2>
          <p className="text-xs xl:text-lg">
            {movie._id.release_date
              ? movie._id.release_date.split("T")[0]
              : "Unknown Date"}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative w-full rounded-lg overflow-hidden flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 h-52  md:h-1/3 2xl:h-48">
        <FaFilm className="text-neutral-500 dark:text-neutral-400 text-4xl" />
      </div>
    );
  }
};

export default CardMenuMovie;
