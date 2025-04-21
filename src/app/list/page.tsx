import MovieList from "@/components/list/MovieList";
import SearchBar from "@/components/widgets/SearchBar";
import MiniCardViewer from "@/components/list/MiniCardViewer";
import RandomButton from "@/components/menu/RandomButton";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import SettingsButton from "@/components/list/SettingsButton";

import GenreFilter from "@/components/list/GenreFilter";
import FilterFormatsButtons from "@/components/menu/FilterFormatsButtons";
import CheckedFilter from "@/components/list/CheckedFilter";
import OrderListButtons from "@/components/menu/OrderListButtons";

const page = () => {
  return (
    <div className="h-[calc(100vh-56px)] lg:h-screen  w-full bg-neutral-300 dark:bg-neutral-950 flex flex-col p-4 gap-4">
      <div className="flex h-48">
        <div className="flex-grow flex flex-col justify-between pe-3 bg-red gap-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="pe-3">
              <IoIosArrowBack className="text-3xl text-blue-500 dark:text-yellow-500" />
            </Link>
            <div className="flex-grow h-full rounded-lg flex justify-end items-center border-2 border-neutral-400 dark:border-neutral-800 bg-neutral-100 dark:bg-transparent gap-2 py-2 px-3">
              <SettingsButton></SettingsButton>
            </div>
          </div>

          <SearchBar></SearchBar>
          <div className="flex justify-between gap-2">
            <div className="w-full">
              <GenreFilter></GenreFilter>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col">
          <h4>filtros</h4>
          <CheckedFilter></CheckedFilter>
          <FilterFormatsButtons></FilterFormatsButtons>
          <OrderListButtons></OrderListButtons>
        </div> */}

        <div className="overflow-hidden rounded-lg aspect-3-4 flex justify-center items-center bg-neutral-100 dark:bg-neutral-950 border-2 border-neutral-300 dark:border-neutral-800">
          <MiniCardViewer></MiniCardViewer>
        </div>
      </div>
      <MovieList></MovieList>
      <div className="flex justify-center bg-blue-500 dark:bg-yellow-500 rounded-md text-neutral-100 dark:text-neutral-900">
        <RandomButton className=" flex gap-2 text-3xl p-4 "></RandomButton>
      </div>
    </div>
  );
};

export default page;
