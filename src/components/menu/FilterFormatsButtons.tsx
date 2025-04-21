"use client";
import { useState, useEffect } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { MovieDB } from "@/context/interfaces/movieTypes";
import SvgVhs from "@/utils/svgs/SvgVhs";
import SvgDvd from "@/utils/svgs/SvgDvd";
import SvgBluRay from "@/utils/svgs/SvgBluRay";

const FilterFormatsButtons = () => {
  const {
    movieList,
    setMovieList,
    activeFormatFilters,
    setActiveFormatFilters,
  } = useMovieContext();
  const [originalMovieList, setOriginalMovieList] = useState<MovieDB[]>([]); // Inicializa como un array vacío
  // const [activeFilters, setActiveFilters] = useState({
  //   vhs: true,
  //   dvd: true,
  //   bluray: true,
  // });

  // const [hasSetOriginalList, setHasSetOriginalList] = useState(false);

  // Función para alternar el estado de un filtro
  const toggleFilter = (formato: "vhs" | "dvd" | "bluray") => {
    console.log("object3");
    setActiveFormatFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [formato]: !prevFilters[formato],
      };
      return updatedFilters;
    });
  };

  // Actualizar la lista filtrada cada vez que cambian los filtros
  // useEffect(() => {
  //   console.log("object2");
  //   filtrarPeliculas();
  // }, [activeFilters]); // Escucha cambios en los filtros

  return (
    // <div className="flex justify-between bg-neutral-100 dark:bg-transparent lg:dark:bg-neutral-800 lg:rounded-lg 2xl:py-4">
    <div className="flex justify-between lg:dark:bg-neutral-800 lg:rounded-lg 2xl:py-4">
      <button
        className={`text-black dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400 ${
          activeFormatFilters.vhs ? "font-bold" : "opacity-20"
        }`}
        onClick={() => {
          console.log("vhs!!!!!!!!!!!!!!!!");
          toggleFilter("vhs");
        }}
      >
        {/* <SvgVhs className="w-14 h-5 lg:h-3 2xl:h-5 text-current" /> */}
        <SvgVhs className="w-14 h-5 lg:h-3 2xl:h-5 text-current -ms-2" />
      </button>
      <button
        className={`text-black dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400 ${
          activeFormatFilters.dvd ? "font-bold" : "opacity-20"
        }`}
        onClick={() => {
          toggleFilter("dvd");
        }}
      >
        <SvgDvd className="w-14 h-5 lg:h-3 2xl:h-5 text-current" />
      </button>
      <button
        className={`text-black dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400 ${
          activeFormatFilters.bluray ? "font-bold" : "opacity-20"
        }`}
        onClick={() => {
          toggleFilter("bluray");
        }}
      >
        <SvgBluRay className="w-14 h-5 lg:h-3 2xl:h-5 text-current" />
      </button>
    </div>
  );
};

export default FilterFormatsButtons;
