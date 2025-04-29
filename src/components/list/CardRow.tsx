"use client";
import { useRef, useState, useEffect } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { getMovieByIdUpdate } from "@/components/widgets/movies.api";
import { useMovieContext } from "@/context/MovieContext";
import { MovieDB } from "@/context/interfaces/movieTypes";
import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";

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
        updatedMovie
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
          (m) => m._id._id === movieProp._id._id
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
      className={`bg-neutral-100 dark:bg-neutral-950 border-2 border-neutral-400 dark:border-neutral-700 mb-2 md:mb-3 p-3 md:py-2
        md:px-4 rounded-lg outline outline-none hover:outline-offset-3 ${
          isFocused
            ? "outline-offset-0 border-blue-700 dark:border-yellow-500"
            : ""
        } hover:border-blue-700 dark:hover:border-yellow-500 hover:cursor-pointer flex justify-between w-full`}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={handleCheckClick}
          className="focus:outline-none text-neutral-500 dark:text-neutral-400"
        >
          {localMovie.checked ? (
            <FaRegCheckCircle className="text-xl hover:text-blue-700 dark:hover:text-yellow-500" />
          ) : (
            <FaRegCircle className="text-xl hover:text-blue-700 dark:hover:text-yellow-500" />
          )}
        </button>
        <p className="text-sm lg:text-md text-black dark:text-white">
          {movieProp._id.title}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-xs text-neutral-500">
          {new Date(movieProp._id.release_date).getFullYear()}
        </p>
        <Link
          className="text-lg lg:text-lg text-blue-700 dark:text-orange-500 hover:text-blue-900 dark:hover:text-orange-700"
          href={`/edit-movie/${movieProp._id._id}`}
        >
          <AiOutlineEdit />
        </Link>
      </div>
    </div>
  );
};
