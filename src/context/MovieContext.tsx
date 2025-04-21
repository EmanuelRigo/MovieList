"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
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
  activeFormatFilters: { vhs: boolean; dvd: boolean; bluray: boolean };
  setActiveFormatFilters: React.Dispatch<
    React.SetStateAction<{ vhs: boolean; dvd: boolean; bluray: boolean }>
  >;
  showChecked: boolean | null;
  setShowChecked: React.Dispatch<React.SetStateAction<boolean | null>>;
  checkedFilter: boolean | null;
  setCheckedFilter: React.Dispatch<React.SetStateAction<boolean | null>>;
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
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
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const [activeFormatFilters, setActiveFormatFilters] = useState({
    vhs: true,
    dvd: true,
    bluray: true,
  });

  const [checkedFilter, setCheckedFilter] = useState<boolean | null>(null);
  const [showChecked, setShowChecked] = useState<null | boolean>(null);

  const updateCardMovie = (movie: MovieDB) => {
    setMovie(movie);
  };

  useEffect(() => {
    setMovie(null);
  }, [movieList]);

  // Set original list solo una vez
  const hasSetOriginal = useRef(false);
  useEffect(() => {
    if (!hasSetOriginal.current && movieList.length > 0) {
      setOriginalMovieList(movieList);
      hasSetOriginal.current = true;
    }
  }, [movieList]);

  // 🔁 Aplicar ambos filtros combinados
  const applyAllFilters = () => {
    let filtered = [...originalMovieList];

    // Filtro por formato
    filtered = filtered.filter((movie) => {
      return (
        (activeFormatFilters.vhs && movie.formats.vhs) ||
        (activeFormatFilters.dvd && movie.formats.dvd) ||
        (activeFormatFilters.bluray && movie.formats.bluray)
      );
    });

    // Filtro por checked
    if (showChecked !== null) {
      filtered = filtered.filter((movie) => movie.checked === showChecked);
    }

    // Filtro por género
    if (selectedGenre !== "") {
      filtered = filtered.filter((movie) =>
        movie._id.genres?.some((g) => g.name === selectedGenre)
      );
    }

    setMovieList(filtered);
  };

  // 👂 Ejecutar filtrado combinado cada vez que cambien los filtros
  useEffect(() => {
    applyAllFilters();
  }, [activeFormatFilters, showChecked, selectedGenre]);

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
    activeFormatFilters,
    setActiveFormatFilters,
    showChecked,
    setShowChecked,
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
