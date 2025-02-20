"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import SearchBar from "./SearchBar";
import CardMenuMovie from "./CardMenuMovie";
import OrderListButtons from "./OrderListButtons";

import { CiCircleList, CiSquarePlus } from "react-icons/ci";


export const FooterMainMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <div
      className={
        "w-full flex flex-col gap-4 justify-between h-full bg-neutral-100 dark:bg-neutral-900 text-black dark:text-neutral-200"
      }
    >
      <div className="flex justify-between items-center p-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors duration-300 ${
            darkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"
          }`}
          title={darkMode ? "Modo Claro" : "Modo Oscuro"}
        >
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </div>
      <div className="flex-grow">
        <div className="pb-4">
          <CardMenuMovie />
        </div>
        <div className="pb-4">
          <Link
            style={{ fontSize: "4rem" }}
            className={`rounded-lg w-full h-18 flex justify-between items-center 
              dark:bg-slate-600 dark:text-gray-200 dark:hover:text-gray-300 
              bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-300`}
            href="/add-movie"
          >
            <span className="text-lg ps-4">Movies: 291</span>
            <CiSquarePlus />
          </Link>
        </div>
        <div className="pb-4">
          <OrderListButtons />
        </div>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
  );
};
