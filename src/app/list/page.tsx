import MovieList from '@/components/list/MovieList'
import SearchBar from '@/components/widgets/SearchBar'
import OrderListButtons from '@/components/menu/OrderListButtons'
const page = () => {
  return (
    <div className='flex flex-col w-full h-full p-4  gap-4'>
      <SearchBar></SearchBar>
      <OrderListButtons></OrderListButtons>
      <MovieList></MovieList>
    </div>
  )
}

export default page
