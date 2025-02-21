import { useState, useEffect } from "react";
import { Movie } from "@/context/interfaces/movieTypes";

export const useMovies = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/movies");
        const result = await response.json();
        const movies = result.response; // Obtener solo la propiedad response
        setData(movies);
        console.log("data", movies);
      } catch (err: unknown) {
        console.error("Error fetching movies:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};