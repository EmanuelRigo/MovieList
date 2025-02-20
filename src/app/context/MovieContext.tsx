"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Movie } from "./interfaces/movieTypes";

interface MovieContextProps {
  movie: Movie | null;
  setMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  updateCardMovie: (movie: Movie) => void;
  movieList: Movie[];
  setMovieList: React.Dispatch<React.SetStateAction<Movie[]>>;
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
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const updateCardMovie = (movie: Movie) => {
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

  return <movieContext.Provider value={value}>{children}</movieContext.Provider>;
};

export default MovieProvider;