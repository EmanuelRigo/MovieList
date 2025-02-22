"use client";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { movieContext } from "@/context/MovieContext";

interface CardRowProps {
  movie: {
    _id: string;
    title: string;
  };
  isFocused: boolean;
}

export const CardRow: React.FC<CardRowProps> = ({ movie, isFocused }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isButtonActive, setIsButtonActive] = useState(false);
  const { updateCardMovie } = useContext(movieContext);

  const handleClick = () => {
    updateCardMovie(movie);
  };

  useEffect(() => {
    if (isFocused) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [isFocused]);

  return (
    <button
      ref={buttonRef}
      id={movie._id}
      onClick={handleClick}
      className={`bg-neutral-300 dark:bg-neutral-950 mb-3 p-4 rounded-lg outline outline-none hover:outline-offset-3 ${
        isButtonActive ? "outline-offset-0 outline-blue-500 dark:outline-orange-500" : ""
      } hover:outline-blue-500 dark:hover:outline-orange-500 hover:cursor-pointer flex justify-between w-full`}
    >
      <p className="text-black dark:text-white">{movie.title}</p>
      <Link
        className="text-blue-500 dark:text-orange-500 hover:text-blue-700 dark:hover:text-orange-700"
        href={`/edit/${movie._id}`}
      >
        edit
      </Link>
    </button>
  );
};