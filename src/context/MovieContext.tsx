"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { MovieDB, Movie } from "./interfaces/movieTypes";

interface MovieContextProps {
  movie: MovieDB | null;
  setMovie: React.Dispatch<React.SetStateAction<MovieDB | null>>;
  updateCardMovie: (movie: MovieDB) => void;
  movieList: MovieDB[];
  setMovieList: React.Dispatch<React.SetStateAction<MovieDB[]>>;
}

export const movieContext = createContext<MovieContextProps | undefined>(undefined);

export const useMovieContext = () => {
  const contextValue = useContext(movieContext);
  if (!contextValue) {
    throw new Error("useMovieContext debe usarse dentro de MovieProvider");
  }
  return contextValue;
};

interface MovieProviderProps {
  children: ReactNode;
}

const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movie, setMovie] = useState<MovieDB | null>(null);
  const [movieList, setMovieList] = useState<MovieDB[]>([]);

  const updateCardMovie = (movie: MovieDB) => {
    setMovie(movie);
  };

  const value = {
    movie,
    setMovie,
    updateCardMovie,
    movieList,
    setMovieList,
  };

  return <movieContext.Provider value={value}>{children}</movieContext.Provider>;
};

export default MovieProvider;