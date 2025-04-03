import { Movie, MovieDB, UserMovie, UserMoviesResponse, UserMovieResponse} from "@/context/interfaces/movieTypes";

//USERMOVIES
export async function getUserMovies(): Promise<UserMoviesResponse> {
  const res = await fetch("https://movielist-backend.vercel.app/api/userMovies", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("🚀 ~ getUserMovies ~ res:", res)
  
  const data = await res.json();
  console.log("🚀 ~ getUserMovies ~ data:", data)
  
  return data;
}

export async function getMovieUser(mid: string): Promise<UserMovieResponse> {
  const res = await fetch(`https://movielist-backend.vercel.app/api/usermovies/movies/${mid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
  console.log("ressss:", res)
  if (!res.ok) {
    throw new Error("Fail to get movie")
  }
  const data = await res.json()
  return data
}

export async function CreateMovie(movieData: MovieDB): Promise<Response> {
  const res = await fetch("https://movielist-backend.vercel.app/api/userMovies", {
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
  mid: string,
  movieData: UserMovie
): Promise<UserMovieResponse> {
  const res = await fetch(`https://movielist-backend.vercel.app/api/userMovies/movies/${mid}`, {
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
  const data = await res.json(); console.log("res", res)
  console.log("🚀 ~ data:", data)
  
  return data;
}

export async function deleteMovieById(id: string): Promise<Response> {
  const res = await fetch(`https://movielist-backend.vercel.app/api/userMovies/movies/${id}`, {
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
  const res = await fetch(`https://movielist-backend.vercel.app/api/movies/${id}`, {
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