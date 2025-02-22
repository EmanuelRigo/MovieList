import React, { useContext } from "react";
import { movieContext } from "@/context/MovieContext";

const OrderListButtons = () => {
  const { setMovieList, movieList, setMovie } = useContext(movieContext);

  function ordenarPorTitulo() {
    const sortedList = [...movieList].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    setMovieList(sortedList);
    console.log(movieList);
  }

  function ordenarPorFecha() {
    const sortedList = [...movieList].sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
    setMovieList(sortedList);
    console.log(movieList);
  }

  function obtenerObjetoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * movieList.length);
    const objetoAleatorio = movieList[indiceAleatorio];
    setMovie(objetoAleatorio);
  }

  return (
    <div className="flex justify-between">
      <button
        className="bg-neutral-200 text-black hover:bg-neutral-300 p-2 rounded-lg dark:bg-neutral-950 dark:text-neutral-200 dark:hover:text-orange-400"
        onClick={ordenarPorFecha}
      >
        Ordenar por fecha
      </button>
      <button
        className="bg-neutral-200 text-black hover:bg-neutral-300 p-2 rounded-lg dark:bg-neutral-950 dark:text-neutral-200  dark:hover:text-orange-400"
        onClick={ordenarPorTitulo}
      >
        Ordenar por título
      </button>
      <button
        className="bg-neutral-200 text-black hover:bg-neutral-300 p-2 rounded-lg dark:bg-neutral-950 dark:text-neutral-200  dark:hover:text-orange-400"
        onClick={obtenerObjetoAleatorio}
      >
        Random
      </button>
    </div>
  );
};

export default OrderListButtons;
