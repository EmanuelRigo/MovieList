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
  // selectedGenre: string;
  // setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
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
  const [activeFormatFilters, setActiveFormatFilters] = useState({
    vhs: true,
    dvd: true,
    bluray: true,
  });

  // const [hasSetOriginalList, setHasSetOriginalList] = useState(false);

  // const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [checkedFilter, setCheckedFilter] = useState<boolean | null>(null);

  const updateCardMovie = (movie: MovieDB) => {
    setMovie(movie);
  };

  useEffect(() => {
    setMovie(null);
  }, [movieList]);

  //FILTERS FORMAT
  const hasSetOriginal = useRef(false);

  useEffect(() => {
    if (!hasSetOriginal.current && movieList.length > 0) {
      console.log("useEffect111");
      setOriginalMovieList(movieList);
      hasSetOriginal.current = true;
    }
  }, [movieList]);

  // Función para filtrar películas según los filtros activos
  const filterMoviesByFormats = () => {
    const listaFiltrada = originalMovieList.filter((movie) => {
      return (
        (activeFormatFilters.vhs && movie.formats.vhs) ||
        (activeFormatFilters.dvd && movie.formats.dvd) ||
        (activeFormatFilters.bluray && movie.formats.bluray)
      );
    });
    setMovieList(listaFiltrada); // Actualiza la lista global con la lista filtrada
  };

  useEffect(() => {
    filterMoviesByFormats();
  }, [activeFormatFilters]);

  //FILTER CHECKED
  const [showChecked, setShowChecked] = useState<null | boolean>(null);

  const filterMoviesByChecked = () => {
    if (showChecked === null) {
      setMovieList(originalMovieList);
    } else {
      const filtered = originalMovieList.filter(
        (movie) => movie.checked === showChecked
      );
      setMovieList(filtered);
    }
  };

  useEffect(() => {
    filterMoviesByChecked();
  }, [showChecked]);

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
    // selectedGenre,
    // setSelectedGenre,
    checkedFilter,
    setCheckedFilter,
  };

  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
};

export default MovieProvider;
