import React, { useState, useEffect } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { MovieDB } from "@/context/interfaces/movieTypes";

const FilterFormatsButtons = () => {
  const { movieList, setMovieList } = useMovieContext();
  const [originalMovieList, setOriginalMovieList] = useState<MovieDB[]>([]); // Inicializa como un array vacío
  const [activeFilters, setActiveFilters] = useState({
    vhs: true,
    dvd: true,
    bluray: true,
  });

  // Sincroniza originalMovieList con movieList cuando este último cambie
  useEffect(() => {
    if (movieList.length > 0 && originalMovieList.length === 0) {
      setOriginalMovieList(movieList); // Solo establece originalMovieList una vez
    }
  }, [movieList]);

  // Función para filtrar películas según los filtros activos
  const filtrarPeliculas = () => {
    const listaFiltrada = originalMovieList.filter((movie) => {
      return (
        (activeFilters.vhs && movie.formats.vhs) ||
        (activeFilters.dvd && movie.formats.dvd) ||
        (activeFilters.bluray && movie.formats.bluray)
      );
    });
    setMovieList(listaFiltrada); // Actualiza la lista global con la lista filtrada
  };

  // Función para alternar el estado de un filtro
  const toggleFilter = (formato: "vhs" | "dvd" | "bluray") => {
    setActiveFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [formato]: !prevFilters[formato] };
      return updatedFilters;
    });
  };

  // Actualizar la lista filtrada cada vez que cambian los filtros
  useEffect(() => {
    filtrarPeliculas();
  }, [activeFilters]); // Escucha cambios en los filtros

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