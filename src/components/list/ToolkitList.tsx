"use client";

import { FaListUl, FaThLarge } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useMovieContext } from "@/context/MovieContext";
import SearchBarWidget from "@/components/widgets/SearchBarWidget";
import YearSearch from "@/components/widgets/YearSearch";
import GenreFilter from "@/components/list/GenreFilter";
import CheckedFilter from "@/components/list/CheckedFilter";
import { logoutUser } from "@/components/widgets/users.api";

// View mode now provided by context

const ToolkitList = () => {
  const router = useRouter();
  const { viewMode, setViewMode } = useMovieContext();

  const handleLogout = async () => {
    try {
      await logoutUser();
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; secure; samesite=strict`;
      }
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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

        bg-background-elevated
      "
    >
      {/* Título + contador */}
      <div className="flex items-baseline gap-3">
        <h1
          className="
            text-xl
            md:text-3xl
            font-bold
            text-accent-hover
            tracking-tight ps-4
          "
        >
          My MovieList
        </h1>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-2 justify-between">
        {/* Buscador */}
        <div className="w-full md:max-w-xs">
          <SearchBarWidget />
        </div>

        {/* Filtros movidos: visibles solo desde md: hacia pantallas más grandes */}
        <div className="hidden md:flex items-center gap-2">
          <div
            className="
              relative
              flex items-center self-stretch
              bg-surface-primary
              border-2 border-border-subtle
              rounded-lg
              px-4
              hover:border-accent-primary
              focus-within:border-accent-primary
              transition-colors duration-150
            "
          >
            <YearSearch />
          </div>

          <div
            className="
              relative
              flex items-center self-stretch
              bg-surface-primary
              border-2 border-border-subtle
              rounded-lg
              px-4
              hover:border-accent-primary
              focus-within:border-accent-primary
              transition-colors duration-150
            "
          >
            <GenreFilter />
          </div>

          <div
            className="
              flex items-center justify-center self-stretch
              bg-surface-primary
              border-2 border-border-subtle
              rounded-lg
              px-4
            "
          >
            <CheckedFilter />
          </div>
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
            aria-pressed={viewMode === "grid"}
            aria-label="Ver como cuadricula"
            className={`
              relative z-10 p-2 rounded-md
              transition-colors duration-150
              ${viewMode === "grid" ? "text-background-primary" : "text-text-muted hover:text-text-primary"}
            `}
          >
            <FaThLarge className="text-sm md:text-base" />
          </button>
        </div>

        {/* Botón logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center text-text-secondary hover:text-accent-primary transition-colors duration-150 text-lg md:text-xl p-2"
          aria-label="Cerrar sesión"
        >
          <IoIosLogOut className="rotate-180" />
        </button>
      </div>
    </header>
  );
};

export default ToolkitList;
