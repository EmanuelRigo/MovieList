import React, { useState, useEffect } from "react";
import { useMovieContext } from "@/context/MovieContext";

const FilterFormatsButtons = () => {
  const { movieList, setMovieList } = useMovieContext();
  const [originalMovieList, setOriginalMovieList] = useState(movieList); 
  const [activeFilters, setActiveFilters] = useState({
    vhs: true,
    dvd: true,
    bluray: true,
  });

  const filtrarPeliculas = () => {
    const listaFiltrada = originalMovieList.filter((movie) => {
      return (
        (activeFilters.vhs && movie.formats.vhs) ||
        (activeFilters.dvd && movie.formats.dvd) ||
        (activeFilters.bluray && movie.formats.bluray)
      );
    });
    setMovieList(listaFiltrada);
  };


  const toggleFilter = (formato: "vhs" | "dvd" | "bluray") => {
    setActiveFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [formato]: !prevFilters[formato] };
      return updatedFilters;
    });
  };


 
  useEffect(() => {
    filtrarPeliculas();
  }, [activeFilters]); 

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4">
        <button
          className={`text-black rounded-lg dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400 ${
            activeFilters.vhs ? "font-bold" : "opacity-50"
          }`}
          onClick={() => toggleFilter("vhs")}
        >
          VHS
        </button>
        <button
          className={`text-black rounded-lg dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400 ${
            activeFilters.dvd ? "font-bold" : "opacity-50"
          }`}
          onClick={() => toggleFilter("dvd")}
        >
          DVD
        </button>
        <button
          className={`text-black rounded-lg dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400 ${
            activeFilters.bluray ? "font-bold" : "opacity-50"
          }`}
          onClick={() => toggleFilter("bluray")}
        >
          Blu-ray
        </button>

      </div>
    </div>
  );
};

export default FilterFormatsButtons;