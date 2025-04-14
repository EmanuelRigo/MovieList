import MovieList from "@/components/list/MovieList";
import SearchBar from "@/components/widgets/SearchBar";
import OrderListButtons from "@/components/menu/OrderListButtons";
import FilterFormatsButtons from "@/components/menu/FilterFormatsButtons";
import MiniCardViewer from "@/components/list/MiniCardViewer";
import RandomButton from "@/components/menu/RandomButton";
import CounterList from "@/components/list/CounterList";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

import GenreFilter from "@/components/list/GenreFilter";

const page = () => {
  return (
    <div className="h-[calc(100vh-56px)] lg:h-screen  w-full bg-neutral-300 dark:bg-neutral-950 flex flex-col p-4 gap-4">
      <div className="flex h-48">
        <div className="flex-grow flex flex-col justify-between pe-4 bg-red">
          <SearchBar></SearchBar>

          <div className="flex items-center justify-between ">
            <div className="flex items-center justify-between w-9/12 pe-8">
              <FilterFormatsButtons></FilterFormatsButtons>
            </div>
            <div className="text-3xl text-neutral-600 dark:text-neutral-100 flex items-center justify-between  w-3/12">
              <OrderListButtons></OrderListButtons>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="00 w-full">
              <GenreFilter></GenreFilter>
              </div>
            <div className="min-w-14 h-full text-neutral-500 dark:text-neutral-100 rounded-lg flex justify-center items-center px-3  border-2 border-neutral-800 text-2xl ">
              <CounterList></CounterList>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg aspect-3-4 flex justify-center items-center bg-neutral-100 dark:bg-neutral-950 border-2 border-neutral-300 dark:border-neutral-800">
          <MiniCardViewer></MiniCardViewer>
        </div>
      </div>
      <MovieList></MovieList>
      <div className="flex bg-blue-500 dark:bg-yellow-500 rounded-md text-neutral-100 dark:text-neutral-900">
        <div className="w-3/12  p-4">
        <Link href="/">
          <IoIosArrowBack className="text-3xl" />
        </Link>
        </div>
        <div className="w-9/12 flex justify-center">
          <RandomButton className=" flex gap-2 text-3xl p-4 "></RandomButton>
        </div>
      </div>
    </div>
  );
};

export default page;
