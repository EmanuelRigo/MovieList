"use client";
import { useContext, useEffect, useRef } from "react";
import { movieContext } from "@/context/MovieContext";
import { CardRow } from "./CardRow";
import OrderListButtons from "../menu/OrderListButtons";

const MovieListClient = ({ list }) => {
  const { movieList, setMovieList, movie } = useContext(movieContext);
  const movieRows = useRef([]);

  useEffect(() => {
    if (list && Array.isArray(list)) {
      setMovieList(list);
    }
  }, [list]); // Añade list como dependencia

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
      <div className="md:hidden">
        {" "}
        <OrderListButtons />
      </div>

      <div className="relative rounded-lg   flex-grow scrollbar-hidden overflow-auto scroll-smooth scoll-duration-600 pt-4 md:pt-0">
        <div className="w-full absolute p-1">
          {movieList && movieList.length > 0 ? (
            movieList.map((element, index) => (
              <div
                key={element._id}
                ref={(el) => (movieRows.current[index] = el)}
                className={
                  movie?._id === element._id
                    ? "outline-offset-0 outline-orange-500 rounded-lg"
                    : ""
                }
              >
                <CardRow
                  movie={element}
                  isFocused={movie?._id === element._id}
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