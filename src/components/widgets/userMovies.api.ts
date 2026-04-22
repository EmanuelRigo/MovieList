import {
  Movie,
  MovieDB,
  UserMovie,
  UserMoviesResponse,
  UserMovieResponse,
} from "@/context/interfaces/movieTypes";
import envsUtils from "@/utils/envs.utils";

const BACKEND_URL = envsUtils.BACKEND_URL;

export async function getMovieByIdAPI(mid: number) {
  const res = await fetch(`${BACKEND_URL}/api/usermovies/movieidapi/${mid}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("🚀 ~ getUserMovieByIdAPI ~ resAPI:", res);
  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    console.log("🚀 ~ getUserMovieByIdAPI ~ res2API2:", res);
    throw new Error(`Error: ${res.status}`);
  }

  return await res.json();
}
