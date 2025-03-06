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

  if (movie) {
    return (
      <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <div className="absolute inset-0">
          <Image
            loader={myLoader}
            src={movie.backdrop_path}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            alt={movie.title || "Movie Poster"}
            className="rounded-lg"
          />
        </div>
        <div className="absolute bottom-0 w-full bg-neutral-100 bg-opacity-70 dark:bg-black dark:bg-opacity-50 dark:text-white p-4">
          <h2 className="text-xs xl:text-xl">{movie.title}</h2>
          <p className="text-xs xl:text-lg">{movie.release_date.split("T")[0]}</p>
        </div>
      </div>
    );
  } else {
    return <h1 className="text-neutral-900 dark:text-neutral-100">no hay pelicula</h1>;
  }
};

export default CardMenuMovie;