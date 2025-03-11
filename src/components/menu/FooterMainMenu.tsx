"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import SearchBar from "../widgets/SearchBar";
import CardMenuMovie from "./CardMenuMovie";
import OrderListButtons from "./OrderListButtons";

import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import YearSearch from "../widgets/YearSearch";

export const FooterMainMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
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

  const handleLogout = () => {
    // Aquí puedes agregar la lógica de logout
    console.log("Logout");
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
        <span className="text-lg">John Doe</span>
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
            Logout
            <BiLogOut />
          </button>
        </div>
      </div>
      <div className="flex-grow">
        <div className="pb-4">
          <CardMenuMovie />
        </div>
        <div className="pb-4">
          <Link
            style={{ fontSize: "4rem" }}
            className={`rounded-lg w-full h-18 flex justify-between items-center 
              dark:bg-neutral-800 dark:text-gray-200 dark:hover:text-orange-500
              bg-gray-100 text-black hover:bg-gray-300 transition-colors duration-300`}
            href="/add-movie"
          >
            <span className="text-lg ps-4">Movies: 291</span>
            <CiSquarePlus />
          </Link>
        </div>
        <div className="pb-4">
          <OrderListButtons />
          <YearSearch onSearch={handleSearchByYear} />
        </div>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
  );
};