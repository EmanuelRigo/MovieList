"use client";
import React, { ChangeEvent } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { LuSearch } from "react-icons/lu";

const SearchBarWidget: React.FC = () => {
  const { searchTerm, setSearchTerm } = useMovieContext();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value); // Solo actualiza el término
  };

  return (
    <div className="w-full flex">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center bg-neutral-100 dark:bg-neutral-950 rounded-lg border-2 border-neutral-400 dark:border-neutral-800 p-2 px-4 w-full"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search in my list"
          className="flex-grow 2xl:py-1 text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-950 outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-orange-500"
        >
          <LuSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBarWidget;
