"use client"
import React from "react";
import { useMovieContext } from "@/context/MovieContext";
import RandomButton from "./RandomButton";

const OrderListButtons = () => {
  const { setMovieList, movieList, setMovie } = useMovieContext()

  function ordenarPorTitulo() {
    const sortedList = [...movieList].sort((a, b) => {
      return a._id.title.localeCompare(b._id.title);
    });
    setMovieList(sortedList);
  }

  function ordenarPorFecha() {
    const sortedList = [...movieList].sort(
      (a, b) => new Date(a._id.release_date).getTime() - new Date(b._id.release_date).getTime()
    );
    setMovieList(sortedList);
  }
   

  return (
    <div className="flex justify-between bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4">
      <button
        className="text-black rounded-lg  dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400"
        onClick={ordenarPorFecha}
      >
        Ordenar por fecha
      </button>
      <button
        className="text-black rounded-lg  dark:text-neutral-200  hover:text-blue-500 dark:hover:text-orange-400"
        onClick={ordenarPorTitulo}
      >
        Ordenar por título
      </button>
      <RandomButton></RandomButton>
    </div>
  );
};

export default OrderListButtons;
