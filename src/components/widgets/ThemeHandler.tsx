"use client";
import { UserData } from "@/context/interfaces/movieTypes";

import { useEffect, useState } from "react";
import { useMovieContext } from "@/context/MovieContext";

type ThemeHandlerProps = {
  children: React.ReactNode;
};

const ThemeHandler = ({ children }: ThemeHandlerProps) => {

  const [darkMode, setDarkMode] = useState(false);
  const {userData} = useMovieContext()
  console.log("🚀 ~ ThemeHandler ~ userData:", userData)

  const initializeTheme = (userData: UserData | null) => {
    try {
      console.log("🚀 ~ userData:", userData);
  
      if (userData && userData.mode) { // Verifica que userData no sea null y que mode exista
        const { mode } = userData;
  
        if (mode === "dark") {
          setDarkMode(true);
          document.body.classList.add("dark");
        } else {
          setDarkMode(false);
          document.body.classList.remove("dark");
        }
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

  return (
    <>
      {children}
    </>
  );
};

export default ThemeHandler;