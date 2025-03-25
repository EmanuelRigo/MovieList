export async function getMovies(): Promise<any> {
  const res = await fetch("http://localhost:9000/api/userMovies", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function CreateMovie(movieData: any): Promise<any> {
  const res = await fetch("http://localhost:9000/api/userMovies", {
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

export async function getMovieById(id: string): Promise<any> {
  const res = await fetch(`http://localhost:9000/api/movies/${id}`, {
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

export async function getMovieByIdUpdate(
  mid: string,
  movieData: any
): Promise<any> {
  const res = await fetch(`http://localhost:9000/api/userMovies/${mid}`, {
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

export async function deleteMovieById(id: string): Promise<any> {
  const res = await fetch(`http://localhost:9000/api/userMovies/movies/${id}`, {
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
