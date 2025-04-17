"use client";
import { useEffect, useState } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { FaRegCircle, FaRegCheckCircle, FaRegDotCircle } from "react-icons/fa";

interface CheckedFilterProps {
  className?: string;
}

const CheckedFilter = ({ className = "" }: CheckedFilterProps) => {
  const { checkedFilter, setCheckedFilter } = useMovieContext();
  const [isMounted, setIsMounted] = useState(false); // Controla el primer render

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
  }, [isMounted]);

  const toggleChecked = () => {
    if (checkedFilter === null) setCheckedFilter(true);
    else if (checkedFilter === true) setCheckedFilter(false);
    else setCheckedFilter(null);
  };

  return (
    <button
      onClick={toggleChecked}
      className={`flex items-center gap-2 ${className}`}
    >
      {checkedFilter === true && (
        <>
          <FaRegCheckCircle className="text-green-500 text-2xl" />
          <span>Checked</span>
        </>
      )}
      {checkedFilter === false && (
        <>
          <FaRegCircle className="text-red-500 text-2xl" />
          <span>Unchecked</span>
        </>
      )}
      {checkedFilter === null && (
        <>
          <FaRegDotCircle className="text-gray-400 text-2xl" />
          <span>All</span>
        </>
      )}
    </button>
  );
};

export default CheckedFilter;
