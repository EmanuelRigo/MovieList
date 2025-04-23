"use client";
import React, { ChangeEvent } from "react";
import { useMovieContext } from "@/context/MovieContext";

const YearSearch: React.FC = () => {
  const { selectedYear, setSelectedYear, originalMovieList } =
    useMovieContext();

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const years = Array.from(
    new Set(
      originalMovieList.map((movie) =>
        new Date(movie._id.release_date).getFullYear()
      )
    )
  ).sort((a, b) => b - a);

  return (
    <select
      value={selectedYear}
      onChange={handleYearChange}
      className="w-20 text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 rounded-l-full outline-none"
    >
      <option value="">All years</option>
      {years.map((year) => (
        <option key={year} value={year.toString()}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSearch;
