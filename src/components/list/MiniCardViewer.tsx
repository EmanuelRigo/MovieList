"use client";

import Image from "next/image";
import React from "react";
import { useMovieContext } from "@/context/MovieContext";

const MiniCardViewer = () => {
  const { movie } = useMovieContext();

  const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${quality || 75}`;
  };

  if (movie && movie._id) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <Image
          loader={myLoader}
          src={movie._id.poster_path || "/images/default-backdrop.jpg"}
          fill
          style={{ objectFit: "cover" }}
          alt={movie._id.title || "Movie Poster"}
        />
      </div>
    );
  } else {
    return <h1 className="text-neutral-900 dark:text-neutral-100">No hay película</h1>;
  }
};

export default MiniCardViewer;