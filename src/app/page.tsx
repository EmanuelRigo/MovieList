import { cookies } from "next/headers";
import { FooterMainMenu } from "@/components/menu/FooterMainMenu";
import CardMovieViewer from "@/components/movie-viewer/CardMovieViewer";
import { MovieDB } from "@/context/interfaces/movieTypes";
import MovieListClient from "@/components/list/MovieListClient";
import envsUtils from "@/utils/envs.utils";
import ToolkitList from "@/components/list/ToolkitList";

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
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }

  return (
    <div className="h-svh w-screen flex flex-col overflow-hidden justify-center">
      <div className="w-full h-full 1-5xl:max-h-[956px] 1-5xl:h-5/6 lg:w-full 1-5xl:container rounded-xl bg-neutral-300 dark:lg:bg-neutral-900 dark:bg-transparent mx-auto grid grid-cols-1 md-grid-template md:grid-rows-[auto_1fr] gap-4 p-4 md:pe-0">
        {/* Banner: ToolkitList ocupa las 3 columnas */}
        <div className="md:col-span-3">
          <ToolkitList />
        </div>

        {/* Fila inferior: ocupa el alto restante y distribuye en 3 columnas */}
        <div className="md:col-span-3 grid grid-cols-1 md-grid-template gap-0 min-h-0 h-full">
          {/* Menú */}
          <div className="flex flex-col justify-between h-full min-h-0">
            <FooterMainMenu />
          </div>

          {/* Lista de películas */}
          <div className="hidden lg:block h-full w-full overflow-auto min-h-0">
            <MovieListClient list={movies} />
          </div>

          {/* Viewer de películas */}
          <div className="hidden lg:block h-full overflow-auto min-h-0 scrollbar-invisible">
            <CardMovieViewer />
          </div>
        </div>
      </div>
    </div>
  );
}
