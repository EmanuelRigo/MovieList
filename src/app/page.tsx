import { cookies } from "next/headers";
import { FooterMainMenu } from "@/components/menu/FooterMainMenu";
import CardMovieViewer from "@/components/movie-viewer/CardMovieViewer";
import { MovieDB } from "@/context/interfaces/movieTypes";
import MovieListClient from "@/components/list/MovieListClient";
import envsUtils from "@/utils/envs.utils";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let movies: MovieDB[] = [];
  const BACKEND_URL = envsUtils.BACKEND_URL;

  if (!token) {
    console.error("No token found");
    return <div className="text-center p-4">No token found.</div>;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/userMovies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Error fetching movies:", res.status);
    } else {
      const moviesData = await res.json();
      movies = moviesData.response.movies;
      console.log("🚀 ~ Home ~ movies:", movies);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }

  return (
    <div className="h-svh w-screen flex flex-col overflow-hidden justify-center">
      {/* <div className="flex-1 w-full container mx-auto grid grid-cols-1 md-grid-template gap-4 p-4 rounded-xl bg-neutral-300 dark:bg-neutral-900"> */}
      <div className="w-full h-full 1-5xl:max-h-[956px] 1-5xl:h-5/6 lg:w-full 1-5xl:container rounded-xl bg-neutral-300 dark:lg:bg-neutral-900 dark:bg-transparent mx-auto grid grid-cols-1 overflow-auto md-grid-template gap-4 p-4">
        {/* Menú */}
        <div className="flex flex-col justify-between">
          <FooterMainMenu />
        </div>

        {/* Lista de películas */}
        <div className="hidden lg:block h-full w-full overflow-auto">
          <MovieListClient list={movies} />
        </div>

        {/* Viewer de películas */}
        <div className="hidden lg:block h-full overflow-auto">
          <CardMovieViewer />
        </div>
      </div>
    </div>
  );
}
