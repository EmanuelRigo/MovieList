"use client";
import { useRef, useState, useEffect } from "react";
import { FaRegCircle, FaCheckCircle, FaEllipsisH } from "react-icons/fa";
import { getMovieByIdUpdate } from "@/components/widgets/movies.api";
import { useMovieContext } from "@/context/MovieContext";
import { MovieDB } from "@/context/interfaces/movieTypes";
import Link from "next/link";
import { manrope } from "@/app/fonts";

interface CardRowProps {
  movieProp: MovieDB;
  index: number;
}

export const CardRow: React.FC<CardRowProps> = ({ movieProp }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { setMovie, movie, movieList } = useMovieContext();
  const [localMovie, setLocalMovie] = useState(movieProp);

  const handleClick = () => {
    setMovie(movieProp);
  };

  const handleCheckClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedMovie = { checked: !localMovie.checked };

    try {
      const movieupdate = await getMovieByIdUpdate(
        localMovie._id._id ?? "",
        updatedMovie,
      );
      if (movieupdate.message !== "Updated with success") {
        throw new Error("Failed to update movie.");
      } else {
        setLocalMovie((prev) => ({
          ...prev,
          checked: updatedMovie.checked,
        }));
        setMovie((prev: MovieDB | null) => {
          if (!prev) return null;
          return {
            ...prev,
            checked: updatedMovie.checked,
          };
        });
      }
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  const isFocused = movie?._id._id === movieProp._id._id;

  useEffect(() => {
    if (isFocused && buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isFocused]);

  return (
    <div
      ref={buttonRef}
      id={movieProp._id._id}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (!movieList || movieList.length === 0) return;

        const currentIndex = movieList.findIndex(
          (m) => m._id._id === movieProp._id._id,
        );

        let nextIndex = currentIndex;

        if (e.key === "ArrowDown") {
          e.preventDefault();
          nextIndex = Math.min(currentIndex + 1, movieList.length - 1);
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          nextIndex = Math.max(currentIndex - 1, 0);
        }

        if (nextIndex !== currentIndex) {
          const nextMovie = movieList[nextIndex];
          setMovie(nextMovie);
          const nextButton = document.getElementById(nextMovie._id._id ?? "");
          nextButton?.focus();
        }
      }}
      className={`
        relative
        overflow-visible
        z-10
        hover:bg-background-secondary
        flex
        items-center
        justify-between
        w-full
        p-3.5
        md:py-2
        md:px-5
        gap-4
        text-text-primary
        border
        rounded-xl
        transition-all
        duration-150
        outline-none
        ${
          isFocused
            ? "bg-accent-primary/10 border-accent-primary shadow-accent "
            : "bg-transparent border-transparent hover:bg-surface-hover/40"
        }
        group
        hover:cursor-pointer
      `}
    >
      <div className="flex items-center gap-3 ">
        <button
          onClick={handleCheckClick}
          className="focus:outline-none text-text-muted hover:text-accent-primary transition-colors duration-150"
          aria-label={
            localMovie.checked ? "Desmarcar como vista" : "Marcar como vista"
          }
        >
          {localMovie.checked ? (
            <FaCheckCircle className="text-lg md:text-xl text-accent-primary hover:text-accent-hover transition-colors duration-150" />
          ) : (
            <FaRegCircle className="text-lg md:text-xl text-text-muted hover:text-accent-primary transition-colors duration-150" />
          )}
        </button>
        <h1
          className={`${manrope.className} text-sm font-normal md:text-base text-text-primary`}
        >
          {movieProp._id.title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-xs md:text-sm font-normal text-text-secondary">
          {new Date(movieProp._id.release_date).getFullYear()}
        </p>
        <Link
          className="text-text-secondary hover:text-accent-primary hover:bg-surface-active p-1.5 rounded-full transition-all duration-150 text-sm md:text-base flex items-center justify-center"
          href={`/edit-movie/${movieProp._id._id}`}
          aria-label="Editar película"
          onClick={(e) => e.stopPropagation()}
        >
          <FaEllipsisH />
        </Link>
      </div>
    </div>
  );
};
