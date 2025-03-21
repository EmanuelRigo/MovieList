"use client";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { movieContext } from "@/context/MovieContext";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { getMovieByIdUpdate } from "@/components/widgets/movies.api";

interface CardRowProps {
  movie: {
    _id: string;
    title: string;
    checked: boolean;
    formats: {
      dvd: boolean;
    };
  };
  isFocused: boolean;
}

export const CardRow: React.FC<CardRowProps> = ({ movie, isFocused }) => {
  
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const { setMovie, setMovieList } = useContext(movieContext);
  const [localMovie, setLocalMovie] = useState(movie);
  const handleClick = () => {
    setMovie(movie);  
  };

  const handleCheckClick = async () => {

    //data to update
    const updatedMovie = {
      checked: !localMovie.checked
    };    
    try {
      const movieupdate = await getMovieByIdUpdate(
        localMovie._id._id,
        updatedMovie
      );
      // setLocalMovie(updatedMovie);
      if (!movieupdate.response.message == "ok") {
        throw new Error("Failed to update movie.");
      } else { 

      setLocalMovie((prev) => ({
        ...prev,
        checked: updatedMovie.checked,
      }));
      console.log("🚀 ~ handleCheckClick ~ localMovie:", localMovie);

      // Actualizar el contexto global si es necesario
      setMovie((prev) => ({
        ...prev,
        checked: updatedMovie.checked,
      }));
      }    
      setMovie(localMovie);
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
      id={movie._id}
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
          {movie._id.title}
        </p>
      </div>

      <Link
        className="text-sm lg:text-lg text-blue-700 dark:text-orange-500 hover:text-blue-900 dark:hover:text-orange-700"
        href={`/edit-movie/${movie._id._id}`}
      >
        edit
      </Link>
    </div>
  );
};
