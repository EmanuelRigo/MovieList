"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { MovieDB } from "@/context/interfaces/movieTypes";
import { useMovieContext } from "@/context/MovieContext";

const GenreFilter = () => {
  const { movieList, setMovieList } = useMovieContext();
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  // Guardar la lista completa de películas
  const [allMovies, setAllMovies] = useState<MovieDB[]>([]);

  // Se ejecuta una sola vez cuando movieList tiene datos iniciales
  useEffect(() => {
    if (movieList.length && allMovies.length === 0) {
      setAllMovies(movieList);
    }
  }, [movieList, allMovies.length]);

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value;
    setSelectedGenre(genre);

    if (genre === "") {
      // Mostrar todas las películas
      setMovieList(allMovies);
      return;
    }

    // Filtrar sobre la lista original, no sobre la ya filtrada
    const filteredMovies = allMovies.filter((movie: MovieDB) =>
      movie._id.genres?.some((g) => g.name === genre)
    );

    setMovieList(filteredMovies);
  };

  // Extraer géneros únicos de todas las películas originales
  const allGenres = allMovies.flatMap((movie: MovieDB) =>
    movie._id.genres?.map((g) => g.name) || []
  );
  const uniqueGenres = Array.from(new Set(allGenres)).sort();

  return (
    <>
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="w-full text-sm bg-transparent text-neutral-900 dark:text-neutral-100 outline-none rounded-lg justify-center items-center p-2 border-2 border-neutral-800"
      >
        <option value="" className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-2 border-neutral-800">Todos los géneros</option>
        {uniqueGenres.map((genre) => (
          <option key={genre} value={genre} className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-2 border-neutral-800">
            {genre}
          </option>
        ))}
      </select>
    </>
  );
};

export default GenreFilter;
