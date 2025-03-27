"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import SearchBar from "../widgets/SearchBar";
import CardMenuMovie from "./CardMenuMovie";
import OrderListButtons from "./OrderListButtons";

import { BsFillMoonStarsFill, BsSun,BsPlusCircle } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import YearSearch from "../widgets/YearSearch";

import { logoutUser } from "../widgets/users.api";
import { useMovieContext } from "@/context/MovieContext";
import FilterFormatsButtons from "./FilterFormatsButtons";
import RandomButton from "./RandomButton";
import { getMovies } from "../widgets/movies.api";

export const FooterMainMenu = () => {
  const username = document.cookie.split(";").find((cookie) => cookie.includes("name"))?.split("=")[1];

  const router = useRouter();
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const { movieList, setMovieList } = useMovieContext(); // Accede a setMovieList desde el contexto

  // Función para cargar las películas al montar el componente
  const fetchMovies = async () => {
    try {
      const movies = await getMovies(); // Llama a la API para obtener las películas
      console.log("🚀 ~ fetchMovies ~ movies:", movies)
      setMovieList(movies.response.movies); // Actualiza la lista global de películas
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(); // Llama a fetchMovies cuando el componente se monta
  }, []);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    const mode = getCookie("mode");
    if (mode === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = async () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);

    try {
      const response = await fetch("http://localhost:9000/api/cookies/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode: darkMode ? "light" : "dark" }),
        credentials: "include", // Asegúrate de incluir las credenciales
      });

      if (!response.ok) {
        throw new Error("Failed to create cookie");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error creating cookie:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Borra todas las cookies
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; secure; samesite=strict`;
      }
      router.push("/login"); // Redirige a la página de inicio de sesión después del logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSearchByYear = (year: string) => {
    console.log("Searching movies from year:", year);
    // Aquí puedes agregar la lógica para manejar la búsqueda por año
  };

  return (
    <div
      className={
        "w-full flex flex-col gap-4 justify-between h-full  text-black dark:text-neutral-200 "
      }
    >
      <div className="flex justify-between bg-neutral-100 dark:bg-neutral-800 rounded-lg items-center p-4">
        <span className="text-lg">{username}</span>
        <div className="flex gap-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              darkMode ? " text-white" : " text-black"
            }`}
            title={darkMode ? "Modo Claro" : "Modo Oscuro"}
          >
            {darkMode ? <BsSun /> : <BsFillMoonStarsFill />}
          </button>
          <button
            onClick={handleLogout}
            className="p-2 px-4 flex items-center justify-center bg-blue-500 dark:bg-orange-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-orange-700 transition-colors duration-300"
          >
            <BiLogOut />
          </button>
        </div>
      </div>
      <div className="flex-grow flex flex-col gap-4">
        <CardMenuMovie />
        <Link
          style={{ fontSize: "4rem" }}
          className={`rounded-lg w-full h-18 flex justify-between items-center dark:bg-neutral-950
              dark:lg:bg-neutral-800 dark:text-gray-200 p-3 bg-gray-100 text-black`}
          href="/add-movie"
        >
          <span className="text-lg">Movies: {movieList.length}</span>
          <BsPlusCircle className="text-2xl text-black dark:text-gray-200 hover:text-blue-500 dark:hover:text-orange-500" />
        </Link>

        <div className="hidden lg:block">
          <YearSearch onSearch={handleSearchByYear} />
        </div>
        <div className="hidden lg:block">
          <OrderListButtons />
        </div>
        <div className="hidden lg:block">
          <FilterFormatsButtons></FilterFormatsButtons>
        </div>
        <div className="lg:hidden text-lg bg-neutral-950 p-4 rounded-md ">
          <RandomButton></RandomButton>
        </div>
        <div className="lg:hidden text-lg bg-neutral-950 p-4 rounded-md">
          <Link className="" href="/list">
            list
          </Link>
        </div>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
  );
};