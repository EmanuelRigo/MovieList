"use client";
import React from "react";
import { useMovieContext } from "@/context/MovieContext";
// import RandomButton from "./RandomButton";
import { RiSortAlphabetAsc } from "react-icons/ri";
import { PiCalendarLight } from "react-icons/pi";

const OrderListButtons = () => {
  const { setMovieList, movieList} = useMovieContext();

  function ordenarPorTitulo() {
    const sortedList = [...movieList].sort((a, b) => {
      return a._id.title.localeCompare(b._id.title);
    });
    setMovieList(sortedList);
  }

  function ordenarPorFecha() {
    const sortedList = [...movieList].sort(
      (a, b) =>
        new Date(a._id.release_date).getTime() -
        new Date(b._id.release_date).getTime()
    );
    setMovieList(sortedList);
  }

  return (
    <>
      <button
        className=" hover:text-blue-500 dark:hover:text-orange-400"
        onClick={ordenarPorFecha}
      >
        <PiCalendarLight />
      </button>
      <button
        className=" hover:text-blue-500 dark:hover:text-orange-400 "
        onClick={ordenarPorTitulo}
      >
        <RiSortAlphabetAsc />
      </button>
      {/* <RandomButton className=" hover:text-blue-500 dark:hover:text-orange-400"></RandomButton> */}
    </>
  );
};

export default OrderListButtons;
