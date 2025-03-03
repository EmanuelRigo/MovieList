"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { movieContext } from "@/context/MovieContext";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
  formats: {
    vhs: boolean;
    dvd: boolean;
    bluray: boolean;
  };
}

const CardMovieViewer: React.FC = () => {
  const { movie } = useContext(movieContext);

  const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${quality || 75}`;
  };

  if (!movie) {
    return <h1 className="text-black dark:text-white">Elija una película</h1>;
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="relative h-[500px] bg-black rounded-lg bg-opacity-50">
        <Image
          loader={myLoader}
          src={movie.poster_path || ""}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          alt={movie.title || "Movie Poster"}
          className="rounded-lg"
        />
      </div>
      <div className="">
        <h3 className="text-black dark:text-white pt-4 lg:pt-0 pb-2 font-bold">{movie.title}</h3>

        <div className="overflow-auto max-h-[70px] md:max-h-[80px] lg:max-h-[90px] scrollbar-hidden">
          <p className="text-xs text-black dark:text-white">{movie.overview}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2">
        <div className={`flex items-center ${movie.formats.vhs ? "text-neutral-900 dark:text-neutral-300" : "text-neutral-500 dark:text-neutral-700"}`}>
          <span>VHS</span>
        </div>
        <div className={`flex items-center ${movie.formats.dvd ? "text-neutral-900 dark:text-neutral-300" : "text-neutral-500 dark:text-neutral-700"}`}>
          <span>DVD</span>
        </div>
        <div className={`flex items-center ${movie.formats.bluray ? "text-neutral-900 dark:text-neutral-300" : "text-neutral-500 dark:text-neutral-700"}`}>
          <span>BLU RAY</span>
        </div>
        <p className="text-black dark:text-white bg-neutral-300 dark:bg-neutral-900 px-4 py-1 rounded-lg">
          {movie.release_date && movie.release_date.split("T")[0]}
        </p>
      </div>
    </div>
  );
};

export default CardMovieViewer;