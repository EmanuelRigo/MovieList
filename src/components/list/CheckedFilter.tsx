"use client";
import { useEffect, useState } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { MovieDB } from "@/context/interfaces/movieTypes";
import { FaRegCircle, FaRegCheckCircle, FaRegDotCircle } from "react-icons/fa";

interface CheckedFilterProps {
  className?: string;
}

const CheckedFilter = ({ className = "" }: CheckedFilterProps) => {
  const { movieList, setMovieList } = useMovieContext();
  const [originalList, setOriginalList] = useState<MovieDB[]>([]);
  const [showChecked, setShowChecked] = useState<null | boolean>(null);

  useEffect(() => {
    if (movieList.length > 0 && originalList.length === 0) {
      setOriginalList(movieList);
    }
  }, [movieList]);

  useEffect(() => {
    if (showChecked === null) {
      setMovieList(originalList);
    } else {
      const filtered = originalList.filter((movie) => movie.checked === showChecked);
      setMovieList(filtered);
    }
  }, [showChecked]);

  const toggleChecked = () => {
    if (showChecked === null) setShowChecked(true);
    else if (showChecked === true) setShowChecked(false);
    else setShowChecked(null);
  };

  return (
    <button
      onClick={toggleChecked}
      className={` ${className}`}
    >
      {showChecked === true && (
        <>
          <FaRegCheckCircle className="text-green-500 text-2xl" />
          <span>Checked</span>
        </>
      )}
      {showChecked === false && (
        <>
          <FaRegCircle className="text-red-500 text-2xl" />
          <span>Unchecked</span>
        </>
      )}
      {showChecked === null && (
        <>
          <FaRegDotCircle className="text-gray-400 text-2xl" />
          <span>All</span>
        </>
      )}
    </button>
  );
};

export default CheckedFilter;
