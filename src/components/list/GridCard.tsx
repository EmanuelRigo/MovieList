"use client";

import { useRef, useState } from "react";
import {
  FaRegCircle,
  FaCheckCircle,
  FaEllipsisH,
  FaFilm,
} from "react-icons/fa";
import { getMovieByIdUpdate } from "@/components/widgets/movies.api";
import { useMovieContext } from "@/context/MovieContext";
import { MovieDB } from "@/context/interfaces/movieTypes";
import Link from "next/link";
import { manrope } from "@/app/fonts";

interface GridCardProps {
  movieProp: MovieDB;
  index: number;
}

export const GridCard: React.FC<GridCardProps> = ({ movieProp }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setMovie } = useMovieContext();
  const [localMovie, setLocalMovie] = useState(movieProp);

  const handleClick = () => {
    setMovie(localMovie);
  };

  const handleCheckClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedChecked = !localMovie.checked;

    try {
      await getMovieByIdUpdate(localMovie._id._id ?? "", {
        checked: updatedChecked,
      });
      setLocalMovie((prev) => ({ ...prev, checked: updatedChecked }));
    } catch (error) {
      console.error("Error al actualizar la película:", error);
    }
  };

  const posterUrl = localMovie._id.poster_path
    ? `https://image.tmdb.org/t/p/w500${localMovie._id.poster_path}`
    : null;

  const year = localMovie._id.release_date
    ? new Date(localMovie._id.release_date).getFullYear()
    : "N/A";

  return (
    <article
      ref={cardRef}
      onClick={handleClick}
      className="
        group relative flex flex-col
        rounded-md md:rounded-md overflow-hidden
        bg-surface-primary border border-border-subtle
        hover:border-accent-primary
        transition-all duration-300 cursor-pointer
      "
    >
      {/* ── Poster ── */}
      <div className="relative w-full aspect-[2/3] bg-background-secondary overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={localMovie._id.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaFilm className="text-text-muted text-4xl" />
          </div>
        )}

        {/* Gradient overlay (visible on hover) */}
        <div
          className="
          absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        "
        />

        {/* Check button – top-right */}
        <button
          type="button"
          onClick={handleCheckClick}
          aria-pressed={localMovie.checked}
          aria-label={
            localMovie.checked ? "Marcar como no vista" : "Marcar como vista"
          }
          className="
            absolute top-2 right-2
            p-1.5 rounded-full
            bg-black/40 backdrop-blur-sm
            hover:bg-black/70
            transition-colors duration-150
            focus-visible:ring-2 focus-visible:ring-accent-primary
          "
        >
          {localMovie.checked ? (
            <FaCheckCircle className="text-base text-accent-primary" />
          ) : (
            <FaRegCircle className="text-base text-text-muted" />
          )}
        </button>

        {/* Edit link – bottom-right, visible on hover */}
        <Link
          href={`/edit-movie/${localMovie._id._id ?? ""}`}
          aria-label="Editar película"
          onClick={(e) => e.stopPropagation()}
          className="
            absolute bottom-2 right-2
            p-1.5 rounded-full
            bg-black/40 backdrop-blur-sm
            text-text-secondary hover:text-accent-primary hover:bg-black/70
            opacity-0 group-hover:opacity-100
            transition-all duration-150
            focus-visible:ring-2 focus-visible:ring-accent-primary
          "
        >
          <FaEllipsisH className="text-sm" />
        </Link>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col gap-1 p-3">
        <h2
          className={`
            ${manrope.className}
            text-sm font-medium text-text-primary
            leading-tight line-clamp-1
          `}
        >
          {localMovie._id.title}
        </h2>

        <p className="text-xs text-text-muted">{year}</p>
      </div>
    </article>
  );
};
