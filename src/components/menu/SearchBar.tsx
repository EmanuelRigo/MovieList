import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { movieContext } from "@/context/MovieContext";
import { Movie } from "@/context/interfaces/movieTypes";

interface SearchBarProps {
  movies?: Movie[];
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const { movie, setMovie, movieList } = useContext(movieContext);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Buscar el primer objeto que tiene la propiedad `title` coincidente
    const normalizeString = (str: string) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina acentos y caracteres diacríticos

    const matchedMovie = movieList.find((movie) =>
      normalizeString(movie.title.toLowerCase()).startsWith(
        normalizeString(value.toLowerCase())
      )
    );

    // Si encuentra un objeto, hace setMovie con el objeto encontrado
    if (matchedMovie) {
      setMovie(matchedMovie);
    } else {
      setMovie(null); // Opcional: limpia si no se encuentra coincidencia
    }
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
        className="flex items-center w-full bg-white rounded-xl shadow-md border border-gray-300"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar"
          className="flex-grow px-4 py-2 text-sm bg-white text-gray-700 rounded-l-full outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center w-12 h-12 text-gray-400 hover:text-gray-800 rounded-full focus:ring-2 focus:ring-blue-300"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;