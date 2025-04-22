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
          <span className="lg:hidden">Checked</span>
        </>
      )}
      {showChecked === false && (
        <>
          <FaRegCircle className="text-red-500 text-2xl" />
          <span className="lg:hidden">Unchecked</span>
        </>
      )}
      {showChecked === null && (
        <>
          <FaRegDotCircle className="text-neutral-300 text-2xl" />
          <span className="lg:hidden">All</span>
        </>
      )}
    </button>
  );
};

export default CheckedFilter;
