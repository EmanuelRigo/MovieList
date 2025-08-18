import {
  Movie,
  MovieDB,
  UserMovie,
  UserMoviesResponse,
  UserMovieResponse,
} from "@/context/interfaces/movieTypes";
import envsUtils from "@/utils/envs.utils";

const BACKEND_URL = envsUtils.BACKEND_URL;

// USERMOVIES
export async function getUserMovies(): Promise<UserMoviesResponse> {
  const res = await fetch(`${BACKEND_URL}/api/userMovies`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

export async function getMovieUser(
  mid: string,
  options?: { headers?: Record<string, string> }
): Promise<UserMovieResponse> {
  const res = await fetch(`${BACKEND_URL}/api/usermovies/movies/${mid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get movie");
  }

  const data = await res.json();
  return data;
}

export async function CreateMovie(
  movieData: MovieDB
): Promise<UserMovieResponse> {
  const res = await fetch(`${BACKEND_URL}/api/userMovies`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });
  const data = await res.json();
  return data;
}

export async function getMovieByIdUpdate(
  mid: string | undefined,
  movieData: UserMovie
): Promise<UserMovieResponse> {
  const res = await fetch(`${BACKEND_URL}/api/userMovies/movies/${mid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(movieData),
  });
  if (!res.ok) {
    throw new Error("Failed to update movie.");
  }
  const data = await res.json();
  return data;
}

export async function deleteMovieById(
  id: string | undefined
): Promise<Response> {
  const res = await fetch(`${BACKEND_URL}/api/userMovies/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to delete movie.");
  }
  const data = await res.json();
  return data;
}

export async function getMovieById(id: string): Promise<Movie> {
  const res = await fetch(`${BACKEND_URL}/api/movies/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch movie.");
  }
  const data = await res.json();
  return data;
}
