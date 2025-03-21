"use client";
import { useContext, useEffect, useRef } from "react";
import { movieContext } from "@/context/MovieContext";
import { CardRow } from "./CardRow";
import OrderListButtons from "../menu/OrderListButtons";
import { Movie } from "@/context/interfaces/movieTypes";

interface MovieListClientProps {
  list: Movie[];
}

const MovieListClient: React.FC<MovieListClientProps> = ({ list }) => {
  const { movieList, setMovieList, movie, setMovie } = useContext(movieContext);
  const movieRows = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (list && Array.isArray(list)) {
      setMovieList(list);
      if (!movie && list.length > 0) {
        setMovie(list[0]); // Establecer la primera película como la seleccionada
      }
    }
  }, [list, setMovieList,  setMovie]);

  useEffect(() => {
    const elementToScroll = movieRows.current.find((row) =>
      row?.classList.contains("outline-offset-0")
    );

    if (elementToScroll) {
      elementToScroll.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [movie]);

  return (
    <>
      <div className="relative rounded-lg flex-grow scrollbar-hidden overflow-auto scroll-smooth scoll-duration-600 ">
        <div className="w-full absolute">
          {movieList && movieList.length > 0 ? (
            movieList.map((element, index) => (
              <div
                key={element._id._id}
                ref={(el) => (movieRows.current[index] = el)}
                className={
                  movie?._id._id === element._id._id
                    ? "outline-offset-0 outline-orange-500 rounded-lg"
                    : ""
                }
              >
                <CardRow
                  movie={element}
                  isFocused={movie?._id._id === element._id._id}
                />
              </div>
            ))
          ) : (
            <div>No hay películas disponibles.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieListClient;