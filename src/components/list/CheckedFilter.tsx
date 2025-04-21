"use client";
import { useMovieContext } from "@/context/MovieContext";
import { FaRegCircle, FaRegCheckCircle, FaRegDotCircle } from "react-icons/fa";

interface CheckedFilterProps {
  className?: string;
}

const CheckedFilter = ({ className = "" }: CheckedFilterProps) => {
  const { showChecked, setShowChecked } = useMovieContext();

  const toggleChecked = () => {
    if (showChecked === null) setShowChecked(true);
    else if (showChecked === true) setShowChecked(false);
    else setShowChecked(null);
  };

  return (
    <button onClick={toggleChecked} className={` ${className}`}>
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
