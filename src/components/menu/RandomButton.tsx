import React from 'react'
import { useMovieContext } from '@/context/MovieContext';

const RandomButton = () => {

    const {movieList, setMovie} = useMovieContext()

    function obtenerObjetoAleatorio() {
        const indiceAleatorio = Math.floor(Math.random() * movieList.length);
        const objetoAleatorio = movieList[indiceAleatorio];
        setMovie(objetoAleatorio);
      }

  return (
    <button
    className="text-black rounded-lg  dark:text-neutral-200  hover:text-blue-500 dark:hover:text-orange-400"
    onClick={obtenerObjetoAleatorio}
  >
    Random
  </button>
  )
}

export default RandomButton
