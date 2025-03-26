"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { getMovieByIdUpdate } from "@/components/widgets/movies.api";
import { useMovieContext } from "@/context/MovieContext";
import { MovieDB } from "@/context/interfaces/movieTypes";

interface CardRowProps {
  isFocused: boolean;
  movieProp: MovieDB;
}

export const CardRow: React.FC<CardRowProps> = ({ movieProp, isFocused }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const { setMovie } = useMovieContext();
  const [localMovie, setLocalMovie] = useState(movieProp);
  const handleClick = () => {
    setMovie(movieProp);
  };

  const handleCheckClick = async () => {
    //data to update
    const updatedMovie = {
      checked: !localMovie.checked,
    };
    try {
      const movieupdate = await getMovieByIdUpdate(
        localMovie._id._id,
        updatedMovie
      );
      // setLocalMovie(updatedMovie);
      if (movieupdate.message !== "ok") {
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
            title: prev._id.title || "",
            release_date: prev._id.release_date || "",
            backdrop_path: prev._id.backdrop_path || "",
            formats: prev.formats || { vhs: false, dvd: false, bluray: false },
          };
        });
      }
      //setMovie(localMovie);
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [isFocused]);

  return (
    <div
      ref={buttonRef}
      id={movieProp._id._id}
      onClick={handleClick}
      className={`bg-neutral-100 dark:bg-neutral-950 border-2 border-neutral-400 dark:border-neutral-700 mb-2 md:mb-3 p-3 md:py-2
        md:px-4 rounded-lg outline outline-none hover:outline-offset-3 ${
          isButtonActive
            ? "outline-offset-0 border-blue-400 dark:border-yellow-500"
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
        <p className="text-sm lg:text-lg text-black dark:text-white">
          {movieProp._id.title}
        </p>
      </div>

      <Link
        className="text-sm lg:text-lg text-blue-700 dark:text-orange-500 hover:text-blue-900 dark:hover:text-orange-700"
        href={`/edit-movie/${movieProp._id._id}`}
      >
        edit
      </Link>
    </div>
  );
};
