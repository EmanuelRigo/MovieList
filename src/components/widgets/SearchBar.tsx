"use client"
import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { movieContext } from "@/context/MovieContext";
import { MovieDB } from "@/context/interfaces/movieTypes";
import { useMovieContext } from "@/context/MovieContext";

interface SearchBarProps {
  movies?: MovieDB[];
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const { movie, setMovie, movieList } = useMovieContext()
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Normaliza la cadena eliminando acentos y caracteres diacríticos
    const normalizeString = (str: string) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Busca la primera película cuyo título coincida con el término de búsqueda
    const matchedMovie = movieList.find((movie: MovieDB) =>
      normalizeString(movie._id.title.toLowerCase()).startsWith(
        normalizeString(value.toLowerCase())
      )
    );

    // Establece la película encontrada o limpia si no hay coincidencia
    setMovie(matchedMovie || null);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (movie) {
      console.log("Selected movie:", movie);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full bg-neutral-100 dark:bg-neutral-950 rounded-md"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar en mi lista"
          className="flex-grow px-4 py-2 text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-950 rounded-l-full outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center w-12 h-12 text-neutral-900 dark:text-neutral-100 hover:text-blue-600 rounded-full dark:hover:text-orange-500 focus:ring-2 focus:ring-orange-700"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;