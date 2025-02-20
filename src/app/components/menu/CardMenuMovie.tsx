"use client";

import Image from "next/image";
import React from "react";
import { useContext } from "react";
import { movieContext } from "@/app/context/MovieContext";

const CardMenuMovie = () => {
  const { movie } = useContext(movieContext);

  const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${quality || 75}`;
  };

  if (movie) {
    return (
      <div className="card lg:card-side bg-base-100 bg-neutral-950 rounded-lg shadow-xl flex w-full">
        <div className="card-body w-1/2 py-5 ps-5">
          <h2 className="card-title">{movie.title}</h2>
          <p>{movie.release_date}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
        <figure className="w-1/2 h-40 relative">
          {" "}
          {/* Ajustar la altura para que sea más larga que alta */}
          <Image
            loader={myLoader}
            src={movie.backdrop_path}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Ajusta los tamaños según tu diseño
            style={{ objectFit: "cover" }}
            alt={movie.title || "Movie Poster"}
            className="rounded-lg"
          />
        </figure>
      </div>
    );
  } else {
    return <h1>no hay pelicula</h1>;
  }
};

export default CardMenuMovie;
