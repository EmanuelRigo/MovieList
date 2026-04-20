import MovieDetailsClient from "./MovieDetailsClient";
import envsUtils from "@/utils/envs.utils";
import { getMovieByIdAPI } from "@/components/widgets/movies.api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
  genres: { id: number; name: string }[];
  formats: {
    vhs: boolean;
    dvd: boolean;
    bluray: boolean;
  };
  director: string;
  year: number;
}

interface Params {
  id: string;
}

export default async function MoviePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const resolvedParams = await params;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${resolvedParams.id}?api_key=${envsUtils.API_KEY}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  const movie: Movie = await res.json();

  let moviePersonal = null;
  try {
    const nextCookies = await cookies();
    const token = nextCookies.get("token")?.value;

    // res.ok ya es true en este punto, hacemos el GET de base de datos
    moviePersonal = await getMovieByIdAPI(resolvedParams.id, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  } catch (error) {
    console.log(
      "No se encontró la película en la base de datos personal (API)",
    );
  }

  if (moviePersonal && moviePersonal.response) {
    redirect(`/edit-movie/${moviePersonal.response._id}`);
  }

  return <MovieDetailsClient movie={movie} />;
}
