import MovieList from "@/components/list/MovieList";
import SearchBar from "@/components/widgets/SearchBar";
import OrderListButtons from "@/components/menu/OrderListButtons";
import FilterFormatsButtons from "@/components/menu/FilterFormatsButtons";
import MiniCardViewer from "@/components/list/MiniCardViewer";

const page = () => {
  return (
    <div className="flex flex-col  w-full h-full p-4 gap-4">
      <SearchBar></SearchBar>
      <div className="flex rounded-lg h-44 bg-neutral-900 overflow-hidden">
        <div className="flex flex-col justify-evenly w-9/12 overflow-hidden">
          <div>
            <OrderListButtons></OrderListButtons>
          </div>
          <FilterFormatsButtons></FilterFormatsButtons>
        </div>
        <div className="w-3/12 bg-blue-600 overflow-hidden">
          <MiniCardViewer></MiniCardViewer>
        </div>
      </div>
      <MovieList></MovieList>
    </div>
  );
};

export default page;