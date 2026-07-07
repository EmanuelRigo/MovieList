"use client";

import { useMemo } from "react";
import { FaListUl, FaThLarge, FaChevronDown } from "react-icons/fa";
import { useMovieContext } from "@/context/MovieContext";
import SearchBarWidget from "@/components/widgets/SearchBarWidget";

// View mode now provided by context

const ToolkitList = () => {
  const {
    movieList,
    selectedYear,
    setSelectedYear,
    selectedGenre,
    setSelectedGenre,
  } = useMovieContext();

  const { viewMode, setViewMode } = useMovieContext();

  const movieCount = movieList.length;

  // Años disponibles a partir de la lista actual
  const years = useMemo(() => {
    const set = new Set<string>();
    movieList.forEach((m) => {
      const date = m._id.release_date;
      if (date) {
        const year = new Date(date).getFullYear().toString();
        if (year !== "NaN") set.add(year);
      }
    });
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [movieList]);

  // Géneros disponibles a partir de la lista actual
  const genres = useMemo(() => {
    const set = new Set<string>();
    movieList.forEach((m) => {
      m._id.genres?.forEach((g) => {
        if (g?.name) set.add(g.name);
      });
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [movieList]);

  return (
    <header
      className="
        flex
        flex-col
        gap-4
        md:flex-row
        md:items-center
        md:justify-between
        w-full
        p-3
        rounded-2xl
        md:rounded-3xl
      "
    >
      {/* Título + contador */}
      <div className="flex items-baseline gap-3">
        <h1
          className="
            text-xl
            md:text-2xl
            font-semibold
            text-text-primary
            tracking-tight
          "
        >
          My Movies
        </h1>
        <span className="text-sm md:text-base text-text-secondary font-normal">
          ({movieCount})
        </span>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-2">
        {/* Buscador */}
        <div className="w-full md:max-w-xs">
          <SearchBarWidget />
        </div>
        {/* Select: Years */}
        <div className="relative w-full sm:w-auto flex items-center self-stretch bg-surface-primary border-2 border-border-subtle rounded-lg px-4 hover:border-accent-primary focus-within:border-accent-primary transition-colors duration-150">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="
              appearance-none
              w-full
              h-full
              bg-transparent
              border-none
              text-text-primary
              text-sm
              outline-none
              cursor-pointer
              pr-6
            "
            aria-label="Filtrar por año"
          >
            <option value="all years">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <FaChevronDown
            className="
              pointer-events-none
              absolute
              right-3
              text-text-muted
              text-xs
            "
          />
        </div>

        {/* Select: Genres */}
        <div className="relative w-full sm:w-auto flex items-center self-stretch bg-surface-primary border-2 border-border-subtle rounded-lg px-4 hover:border-accent-primary focus-within:border-accent-primary transition-colors duration-150">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="
              appearance-none
              w-full
              h-full
              bg-transparent
              border-none
              text-text-primary
              text-sm
              outline-none
              cursor-pointer
              pr-6
            "
            aria-label="Filtrar por género"
          >
            <option value="genres">Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <FaChevronDown
            className="
              pointer-events-none
              absolute
              right-3
              text-text-muted
              text-xs
            "
          />
        </div>

        {/* Toggle: vista lista / cuadricula */}
        <div
          className="
            relative inline-flex items-center
            gap-0 p-1 rounded-lg
            bg-surface-primary border border-border-subtle
            self-stretch
          "
          role="group"
          aria-label="Modo de visualización"
        >
          {/* Pastilla deslizante */}
          <span
            aria-hidden="true"
            className={`
              absolute top-1 bottom-1 left-1
              w-[calc(50%-4px)]
              rounded-md bg-accent-primary
              transition-transform duration-300 ease-in-out
              ${viewMode === "grid" ? "translate-x-full" : "translate-x-0"}
            `}
          />

          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-label="Ver como lista"
            aria-pressed={viewMode === "list"}
            className={`
              relative z-10 p-2 rounded-md
              transition-colors duration-150
              ${viewMode === "list" ? "text-background-primary" : "text-text-muted hover:text-text-primary"}
            `}
          >
            <FaListUl className="text-sm md:text-base" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-label="Ver como cuadricula"
            aria-pressed={viewMode === "grid"}
            className={`
              relative z-10 p-2 rounded-md
              transition-colors duration-150
              ${viewMode === "grid" ? "text-background-primary" : "text-text-muted hover:text-text-primary"}
            `}
          >
            <FaThLarge className="text-sm md:text-base" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ToolkitList;
