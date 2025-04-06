"use client";

import { useEffect, useState } from "react";

type ThemeHandlerProps = {
  children: React.ReactNode;
};

const ThemeHandler = ({ children }: ThemeHandlerProps) => {
  const [darkMode, setDarkMode] = useState(false);

  const initializeTheme = () => {
    try {
      // Obtén el valor de la cookie "mode"
      const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      console.log("🚀 ~ cookies:", cookies);

      const mode = cookies["mode"];
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
  }, []);

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