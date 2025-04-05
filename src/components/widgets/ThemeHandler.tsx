"use client";

import { useEffect, useState } from "react";

type ThemeHandlerProps = {
  children: React.ReactNode;
};

const ThemeHandler = ({ children }: ThemeHandlerProps) => {
  const [darkMode, setDarkMode] = useState(false);

  const initializeTheme = async () => {
    try {
      // Obtén el valor de la cookie "mode"
      const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

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

  const toggleDarkMode = async () => {
    const newMode = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);

  };

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <div className="bg-red-500">
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-lg transition-colors duration-300 ${
          darkMode ? "text-white" : "text-black"
        }`}
        title={darkMode ? "Modo Claro" : "Modo Oscuro"}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
      {children}
    </div>
  );
};

export default ThemeHandler;