"use client";
import { useEffect, useRef } from "react";
import { CardRow } from "./CardRow";
import OrderListButtons from "../menu/OrderListButtons";
import { MovieDB } from "@/context/interfaces/movieTypes";
import { useMovieContext } from "@/context/MovieContext";

interface MovieListClientProps {
  list: MovieDB[];
}

const MovieListClient: React.FC<MovieListClientProps> = ({ list }) => {
  const { movieList, setMovieList, movie, setMovie } = useMovieContext()
  const movieRows = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (list && Array.isArray(list)) {
      setMovieList(list);
      if (!movie && list.length > 0) {
        setMovie(list[0]);
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
                ref={(el) => {
                  movieRows.current[index] = el;
                }}
                className={
                  movie?._id._id === element._id._id
                    ? "outline-offset-0 outline-orange-500 rounded-lg"
                    : ""
                }
              >
                <CardRow
                  movieProp={element}
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