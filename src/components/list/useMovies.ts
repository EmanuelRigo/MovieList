"use client"
import { useState, useEffect } from "react";
import { Movie } from "@/context/interfaces/movieTypes";

export const useMovies = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/userMovies/67d73f5e33527bcf7d53f362");
        console.log("response", response);
        const result = await response.json();
        const data = result.response;
        console.log("moviesss",data) // Obtener solo la propiedad response
        setData(data.movies);
        console.log("data", data);
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