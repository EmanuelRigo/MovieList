import { useMovieContext } from "@/context/MovieContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const RandomButton = () => {
  const pathname = usePathname();
  console.log("🚀 ~ RandomButton ~ pathname:", pathname);

  const { movieList, setMovie } = useMovieContext();
  const [hasExecuted, setHasExecuted] = useState(false); // Estado para rastrear si el efecto ya se ejecutó

  function obtenerObjetoAleatorio() {
    if (movieList.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * movieList.length);
      const objetoAleatorio = movieList[indiceAleatorio];
      console.log("🚀 ~ obtenerObjetoAleatorio ~ objetoAleatorio:", objetoAleatorio);
      setMovie(objetoAleatorio);
    }
  }

  useEffect(() => {
    if (!hasExecuted && pathname === "/" && movieList.length > 0) {
      console.log("🚀 ~ Ejecutando obtenerObjetoAleatorio en / por primera vez");
      obtenerObjetoAleatorio();
      setHasExecuted(true); // Marca que el efecto ya se ejecutó
    }
  }, [pathname, movieList, hasExecuted]); // Dependencias necesarias

  return (
    <button
      className="text-black rounded-lg dark:text-neutral-200 hover:text-blue-500 dark:hover:text-orange-400"
      onClick={obtenerObjetoAleatorio}
    >
      Random
    </button>
  );
};

export default RandomButton;