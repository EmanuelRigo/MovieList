"use client";
import { useState, useEffect } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { MovieDB } from "@/context/interfaces/movieTypes";
import SvgVhs from "@/utils/svgs/SvgVhs";
import SvgDvd from "@/utils/svgs/SvgDvd";
import SvgBluRay from "@/utils/svgs/SvgBluRay";

const FilterFormatsButtons = () => {
  const { movieList, setMovieList, originalMovieList, setOriginalMovieList } =
    useMovieContext();
  // const [originalMovieList, setOriginalMovieList] = useState<MovieDB[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    vhs: true,
    dvd: true,
    bluray: true,
  });
  const [isMounted, setIsMounted] = useState(false); // 🧠 controla el primer render

  useEffect(() => {
    if (movieList.length > 0 && originalMovieList.length === 0) {
      setOriginalMovieList(movieList);
    }
  }, [movieList]);

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
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [formato]: !prevFilters[formato],
    }));
  };

  useEffect(() => {
    if (isMounted) {
      filtrarPeliculas();
      console.log("Aplicando filtros...");
    } else {
      setIsMounted(true);
    }
  }, [activeFilters]);

  return (
    <>
      <button
        className={`text-neutral-600 dark:text-neutral-200 hover:text-blue-500 lg:dark:hover:text-orange-400 ${
          activeFilters.vhs ? "" : "opacity-30"
        }`}
        onClick={() => toggleFilter("vhs")}
      >
        <SvgVhs className="w-14 h-5 lg:h-3 2xl:h-5 text-current -ms-2" />
      </button>
      <button
        className={`text-neutral-600 dark:text-neutral-200 hover:text-blue-500 lg:dark:hover:text-orange-400 ${
          activeFilters.dvd ? "" : "opacity-30"
        }`}
        onClick={() => toggleFilter("dvd")}
      >
        <SvgDvd className="w-14 h-5 lg:h-3 2xl:h-5 text-current" />
      </button>
      <button
        className={`text-neutral-600 dark:text-neutral-200 hover:text-blue-500 lg:dark:hover:text-orange-400 ${
          activeFilters.bluray ? "" : "opacity-30"
        }`}
        onClick={() => toggleFilter("bluray")}
      >
        <SvgBluRay className="w-14 h-5 lg:h-3 2xl:h-5 text-current" />
      </button>
    </>
  );
};

export default FilterFormatsButtons;
