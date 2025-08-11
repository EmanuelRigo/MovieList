"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import CardMenuMovie from "./CardMenuMovie";
import OrderListButtons from "./OrderListButtons";

import YearSearch from "../widgets/YearSearch";

import { logoutUser } from "../widgets/users.api";
import { useMovieContext } from "@/context/MovieContext";
import FilterFormatsButtons from "./FilterFormatsButtons";
import RandomButton from "./RandomButton";
import { getUserMovies } from "../widgets/movies.api";
import { BsListUl } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import SettingsMenuModal from "./SettingsMenuModal";
import CheckedFilter from "../list/CheckedFilter";
import { FaRegTimesCircle } from "react-icons/fa";
import SearchBarWidget from "../widgets/SearchBarWidget";

import GenreFilter from "../list/GenreFilter";
export const FooterMainMenu = () => {
  const router = useRouter();
  const { movieList, setMovieList, username, setUsername } = useMovieContext();

  const fetchMovies = async () => {
    try {
      const movies = await getUserMovies();
      setMovieList(movies.response.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
  }

  useEffect(() => {
    if (window.innerWidth < 1023) {
      fetchMovies();
    }

    const name = getCookie("name");
    setUsername(name);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; secure; samesite=strict`;
      }
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div
      className={
        "w-full flex flex-col gap-4 justify-between h-full  text-black dark:text-neutral-200 "
      }
    >
      <div className="flex justify-between bg-neutral-100 dark:bg-neutral-800 rounded-lg items-center p-2 2xl:p-4 px-3 ">
        <SettingsMenuModal />
        <span className="text-md 2xl:text-xl ms-1">{username || "Guest"}</span>
        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center text-blue-500 dark:text-yellow-500 hover:text-blue-700 dark:hover:text-orange-700 transition-colors duration-300 text-3xl rotate-180"
          >
            <IoIosLogOut />
          </button>
        </div>
      </div>
      <div className="flex-grow flex flex-col gap-4">
        <div>
          <SearchBarWidget />
        </div>
        <CardMenuMovie />
        <Link
          className="group rounded-lg w-full flex justify-between items-center bg-gray-100 dark:bg-neutral-900
              dark:lg:bg-neutral-800 text-black dark:text-gray-200 p-4 ps-3 "
          href="/add-movie"
        >
          <span className="ms-2 2xl:ms-0 text-lg">
            Movies: {movieList.length}
          </span>
          <FaRegTimesCircle className="text-2xl text-black dark:text-neutral-200 hover:text-blue-500 dark:group-hover:text-yellow-500 rotate-45" />
        </Link>
        <div className="hidden lg:flex w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg py-2">
          <div className="w-1/3 flex items-center justify-center">
            <YearSearch />
          </div>
          <div className="flex-grow flex justify-center border-l-2 border-r-2 border-neutral-300 dark:border-neutral-600">
            <GenreFilter />
          </div>
          <div className="w-1/3 flex items-center justify-center">
            <CheckedFilter className="w-full flex items-center justify-center" />
          </div>
        </div>
        <div className="hidden lg:flex justify-between text-black dark:text-neutral-200 lg:text-3xl p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <OrderListButtons />
          <FilterFormatsButtons />
        </div>
        <div className="lg:hidden text-lg bg-neutral-100 dark:bg-neutral-900 hover:text-blue-500 dark:hover:text-yellow-500 p-4 rounded-md">
          <Link className="flex items-center gap-2" href="/list">
            <BsListUl className="text-3xl" /> <span>List</span>
          </Link>
        </div>
      </div>

      <RandomButton className="flex justify-center items-center gap-2 text-2xl p-4 bg-blue-500 dark:bg-yellow-500 rounded-md text-neutral-100 dark:text-neutral-900"></RandomButton>
    </div>
  );
};
