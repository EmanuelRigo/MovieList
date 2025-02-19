"use client";

import { createContext, useContext, useState } from "react";

// Asegúrate de que el contexto tenga un valor inicial (null en este caso)
export const contexto = createContext(null);

export const useCart = () => {
  const valorDelContexto = useContext(contexto);

  // Si el contexto no está disponible, arrojar un error para advertir
  if (!valorDelContexto) {
    throw new Error("useCart debe ser usado dentro de un CustomProvider");
  }

  return valorDelContexto;
};

const CustomProvider = ({ children }) => {
  const [movie, setMovie] = useState([]);

  const updateCardMovie = (movie) => {
    setMovie(movie);
    console.log(movie);
  };

  const valorDelContexto = { updateCardMovie };

  return (
    <contexto.Provider value={valorDelContexto}>{children}</contexto.Provider>
  );
};

export default CustomProvider;
