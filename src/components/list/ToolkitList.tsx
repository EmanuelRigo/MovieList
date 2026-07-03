"use client";

import { useState, useMemo } from "react";
import { FaListUl, FaThLarge, FaChevronDown } from "react-icons/fa";
import { useMovieContext } from "@/context/MovieContext";
import SearchBarWidget from "@/components/widgets/SearchBarWidget";

type ViewMode = "list" | "grid";

const ToolkitList = () => {
  const { movieList, selectedYear, setSelectedYear, selectedGenre, setSelectedGenre } =
    useMovieContext();

  const [viewMode, setViewMode] = useState<ViewMode>("list");

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
        p-4
        md:p-5
        rounded-2xl
        md:rounded-3xl
        bg-background-elevated
        border
        border-border-subtle
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

      {/* Buscador */}
      <div className="w-full md:max-w-xs">
        <SearchBarWidget />
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-2">
        {/* Select: Years */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="
              appearance-none
              w-full
              sm:w-auto
              bg-surface-primary
              border
              border-border-subtle
              text-text-primary
              text-sm
              rounded-full
              pl-4
              pr-9
              py-2
              hover:border-accent-primary
              focus:outline-none
              focus:border-accent-primary
              transition-colors
              duration-150
              cursor-pointer
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
              top-1/2
              -translate-y-1/2
              text-text-muted
              text-xs
            "
          />
        </div>

        {/* Select: Genres */}
        <div className="relative">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="
              appearance-none
              w-full
              sm:w-auto
              bg-surface-primary
              border
              border-border-subtle
              text-text-primary
              text-sm
              rounded-full
              pl-4
              pr-9
              py-2
              hover:border-accent-primary
              focus:outline-none
              focus:border-accent-primary
              transition-colors
              duration-150
              cursor-pointer
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
              top-1/2
              -translate-y-1/2
              text-text-muted
              text-xs
            "
          />
        </div>

        {/* Toggle: vista lista / cuadricula */}
        <div
          className="
            inline-flex
            items-center
            gap-1
            p-1
            rounded-full
            bg-surface-primary
            border
            border-border-subtle
            self-start
            sm:self-auto
          "
          role="group"
          aria-label="Modo de visualización"
        >
          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-label="Ver como lista"
            aria-pressed={viewMode === "list"}
            className={`
              p-2
              rounded-full
              transition-all
              duration-150
              ${
                viewMode === "list"
                  ? "bg-accent-primary text-background-primary"
                  : "text-text-muted hover:text-text-primary hover:bg-surface-hover"
              }
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
              p-2
              rounded-full
              transition-all
              duration-150
              ${
                viewMode === "grid"
                  ? "bg-accent-primary text-background-primary"
                  : "text-text-muted hover:text-text-primary hover:bg-surface-hover"
              }
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
