"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CustomContextProps {
  updateCardMovie: (movie: Movie) => void;
}

export const contexto = createContext<CustomContextProps | undefined>(undefined);

export const useCart = () => {
  const valorDelContexto = useContext(contexto);

  if (!valorDelContexto) {
    throw new Error("useCart debe ser usado dentro de un CustomProvider");
  }

  return valorDelContexto;
};

interface CustomProviderProps {
  children: ReactNode;
}

const CustomProvider = ({ children }: CustomProviderProps) => {
  const [movie, setMovie] = useState<Movie[]>([]);

  const updateCardMovie = (movie: Movie) => {
    setMovie(movie);
    console.log(movie);
  };

  const valorDelContexto = { updateCardMovie };

  return (
    <contexto.Provider value={valorDelContexto}>{children}</contexto.Provider>
  );
};

export default CustomProvider;