"use client";

import Image from "next/image";
import React from "react";
import { useContext } from "react";
import { movieContext } from "@/context/MovieContext";

const CardMenuMovie = () => {
  const { movie } = useContext(movieContext);

  const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${quality || 75}`;
  };

  if (movie && movie._id) {
    return (
      <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <div className="absolute inset-0">
          <Image
            loader={myLoader}
            src={movie._id.backdrop_path || "/images/default-backdrop.jpg"} // Fallback para backdrop_path
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            alt={movie._id.title || "Movie Poster"} // Fallback para title
            className="rounded-lg"
          />
        </div>
        <div className="absolute bottom-0 w-full bg-neutral-100 bg-opacity-70 dark:bg-black dark:bg-opacity-50 dark:text-white p-4">
          <h2 className="text-xs xl:text-xl">{movie._id.title || "Unknown Title"}</h2> {/* Fallback para title */}
          <p className="text-xs xl:text-lg">
            {movie._id.release_date ? movie._id.release_date.split("T")[0] : "Unknown Date"} {/* Fallback para release_date */}
          </p>
        </div>
      </div>
    );
  } else {
    return <h1 className="text-neutral-900 dark:text-neutral-100">No hay película</h1>;
  }
};

export default CardMenuMovie;