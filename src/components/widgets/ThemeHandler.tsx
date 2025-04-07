"use client";

import { useEffect, useState } from "react";
import { useMovieContext } from "@/context/MovieContext";

type ThemeHandlerProps = {
  children: React.ReactNode;
};

const ThemeHandler = ({ children }: ThemeHandlerProps) => {

  const [darkMode, setDarkMode] = useState(false);
  const {userData} = useMovieContext()
  console.log("🚀 ~ ThemeHandler ~ userData:", userData)

  const initializeTheme = () => {
    console.log("🚀 ~ ThemeHandler ~ userData222:", userData)
    try {
      console.log("🚀 ~ userData:", userData);
  
      const { mode } = userData; // Extrae el valor de "mode" desde userData
  
      if (mode === "dark") {
        setDarkMode(true);
        document.body.classList.add("dark");
      } else {
        setDarkMode(false);
        document.body.classList.remove("dark");
      }
    } catch (error) {
      console.error("Error inicializando el tema:", error);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);

    // Actualiza la clase del body
    if (newMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Actualiza la cookie "mode"
    document.cookie = `mode=${newMode}; path=/; max-age=31536000; SameSite=Strict`;
  };

  useEffect(() => {
    initializeTheme();
  }, [userData]);

  return (
    <div>
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-lg transition-colors duration-300 ${
          darkMode ? "text-white bg-black" : "text-black bg-white"
        }`}
        title={darkMode ? "Modo Claro" : "Modo Oscuro"}
      >
        {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
      </button>
      {children}
    </div>
  );
};

export default ThemeHandler;