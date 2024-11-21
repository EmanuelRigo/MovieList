"use client";
import React, { createContext, useContext, useState } from "react";

export const movieContext = createContext();
const Provider = movieContext.Provider;

export const useMovieContext = () => {
  const contextValue = useContext(movieContext);
  if (!contextValue) {
    throw new Error("useMovieContext debe usarse dentro de MovieProvider");
  }
  return contextValue;
};

const MovieProvider = ({ children }) => {
  const [movie, setMovie] = useState(null);
  const [movieList, setMovieList] = useState([]);

  const updateCardMovie = (movie) => {
    setMovie(movie);
    console.log(movie);
  };

  const value = {
    movie,
    setMovie,
    updateCardMovie,
    movieList,
    setMovieList,
  };

  return <Provider value={value}>{children}</Provider>;
};

export default MovieProvider;
