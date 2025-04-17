"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MovieDB, UserData } from "./interfaces/movieTypes";

interface MovieContextProps {
  movie: MovieDB | null;
  setMovie: React.Dispatch<React.SetStateAction<MovieDB | null>>;
  updateCardMovie: (movie: MovieDB) => void;
  movieList: MovieDB[];
  setMovieList: React.Dispatch<React.SetStateAction<MovieDB[]>>;
  originalMovieList: MovieDB[];
  setOriginalMovieList: React.Dispatch<React.SetStateAction<MovieDB[]>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
  formatFilters: { vhs: boolean; dvd: boolean; bluray: boolean };
  setFormatFilters: React.Dispatch<
    React.SetStateAction<{ vhs: boolean; dvd: boolean; bluray: boolean }>
  >;
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
  checkedFilter: boolean | null;
  setCheckedFilter: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const movieContext = createContext<MovieContextProps | undefined>(
  undefined
);

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
  const [originalMovieList, setOriginalMovieList] = useState<MovieDB[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [username, setUsername] = useState<string | undefined>("");

  // Estados nuevos para filtros
  const [formatFilters, setFormatFilters] = useState({
    vhs: true,
    dvd: true,
    bluray: true,
  });

  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [checkedFilter, setCheckedFilter] = useState<boolean | null>(null);

  const updateCardMovie = (movie: MovieDB) => {
    setMovie(movie);
  };

  useEffect(() => {
    setMovie(null);
  }, [movieList]);

  // Aplica todos los filtros combinados
  useEffect(() => {
    let filtered = [...originalMovieList];

    // Filtro por formato
    filtered = filtered.filter((movie) => {
      return (
        (formatFilters.vhs && movie.formats.vhs) ||
        (formatFilters.dvd && movie.formats.dvd) ||
        (formatFilters.bluray && movie.formats.bluray)
      );
    });

    // Filtro por género
    if (selectedGenre !== "") {
      filtered = filtered.filter((movie) =>
        movie._id.genres?.some((g) => g.name === selectedGenre)
      );
    }

    // Filtro por checked
    if (checkedFilter !== null) {
      filtered = filtered.filter((movie) => movie.checked === checkedFilter);
    }

    setMovieList(filtered);
  }, [formatFilters, selectedGenre, checkedFilter, originalMovieList]);

  const value: MovieContextProps = {
    movie,
    setMovie,
    updateCardMovie,
    movieList,
    setMovieList,
    originalMovieList,
    setOriginalMovieList,
    userData,
    setUserData,
    username,
    setUsername,
    formatFilters,
    setFormatFilters,
    selectedGenre,
    setSelectedGenre,
    checkedFilter,
    setCheckedFilter,
  };

  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
};

export default MovieProvider;
