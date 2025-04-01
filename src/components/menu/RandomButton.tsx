import { useMovieContext } from "@/context/MovieContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiCardRandom } from "react-icons/gi";

const RandomButton = () => {
  const pathname = usePathname();
  const { movieList, setMovie } = useMovieContext();
  const [hasExecuted, setHasExecuted] = useState(false); // Estado para rastrear si el efecto ya se ejecutó

  function obtenerObjetoAleatorio() {
    if (movieList.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * movieList.length);
      const objetoAleatorio = movieList[indiceAleatorio];

      setMovie(objetoAleatorio);
    }
  }

  useEffect(() => {
    if (!hasExecuted && pathname === "/" && movieList.length > 0) {
      obtenerObjetoAleatorio();
      setHasExecuted(true); // Marca que el efecto ya se ejecutó
    }
  }, [pathname, movieList, hasExecuted]); // Dependencias necesarias

  return (
    <button
      className="text-black text-3xl dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400"
      onClick={obtenerObjetoAleatorio}
    >
  <GiCardRandom />
    </button>
  );
};

export default RandomButton;