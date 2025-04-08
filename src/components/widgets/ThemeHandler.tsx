"use client";
import { useEffect } from "react";
import { useMovieContext } from "@/context/MovieContext";

type ThemeHandlerProps = {
  children: React.ReactNode;
};

const ThemeHandler = ({ children }: ThemeHandlerProps) => {
  const { userData } = useMovieContext();

  const initializeTheme = (userData: { mode?: string } | null) => {
    try {
      if (userData?.mode) {
        const isDarkMode = userData.mode === "dark";
        document.body.classList.toggle("dark", isDarkMode);
      } else {
        console.warn("No se pudo inicializar el tema: userData es nulo o no tiene un modo definido.");
      }
    } catch (error) {
      console.error("Error inicializando el tema:", error);
    }
  };

  useEffect(() => {
    initializeTheme(userData);
  }, [userData]);

  return <>{children}</>;
};

export default ThemeHandler;