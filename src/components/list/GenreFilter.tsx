"use client";

import React, { ChangeEvent } from "react";
import { useMovieContext } from "@/context/MovieContext";

const GenreFilter = () => {
  const { selectedGenre, setSelectedGenre, originalMovieList } =
    useMovieContext();

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
    // Ya no filtramos acá, el contexto se encarga del filtrado
  };

  // Extraer géneros únicos de todas las películas originales
  const allGenres = originalMovieList.flatMap(
    (movie) => movie._id.genres?.map((g) => g.name) || []
  );
  const uniqueGenres = Array.from(new Set(allGenres)).sort();

  return (
    <select
      value={selectedGenre}
      onChange={handleGenreChange}
      className="w-full text-sm bg-transparent text-neutral-900 dark:text-neutral-100 outline-none rounded-lg justify-center items-center p-2 border-2 border-neutral-400 dark:border-neutral-800 bg-white dark:bg-transparent"
    >
      <option
        value=""
        className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-2 border-neutral-800"
      >
        Todos los géneros
      </option>
      {uniqueGenres.map((genre) => (
        <option
          key={genre}
          value={genre}
          className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-2 border-neutral-800"
        >
          {genre}
        </option>
      ))}
    </select>
  );
};

export default GenreFilter;
