import MovieList from "@/components/list/MovieList";
import SearchBar from "@/components/widgets/SearchBar";
import OrderListButtons from "@/components/menu/OrderListButtons";
import FilterFormatsButtons from "@/components/menu/FilterFormatsButtons";
import MiniCardViewer from "@/components/list/MiniCardViewer";
import RandomButton from "@/components/menu/RandomButton";

const page = () => {
  return (
    <div className="h-[calc(100vh-56px)] lg:h-screen  w-full bg-neutral-300 dark:bg-neutral-950 flex flex-col p-4 gap-4">
      <div className="flex h-44 ">
        <div className="flex-grow flex flex-col justify-between pe-4 bg-red">
          <SearchBar></SearchBar>
          <div className="flex items-center justify-between ">
            <div className=" ">
              <FilterFormatsButtons></FilterFormatsButtons>
            </div>
            <OrderListButtons></OrderListButtons>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg aspect-3-4 flex justify-center items-center bg-neutral-100 dark:bg-neutral-950 border-2 border-neutral-300 dark:border-neutral-800">
          <MiniCardViewer></MiniCardViewer>
        </div>
      </div>
      <MovieList></MovieList>
      <RandomButton className="w-full bg-blue-500 dark:bg-yellow-500 p-4 rounded-md flex items-center gap-2 text-3xl  text-neutral-100 dark:text-neutral-900"></RandomButton>
    </div>
  );
};

export default page;
