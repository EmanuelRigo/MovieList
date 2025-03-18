"use client";
import { getMovies } from "../widgets/movies.api";
import { useState, useEffect } from "react";
import { Movie } from "@/context/interfaces/movieTypes";

export const useMovies = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMovies(); // Usar la función getMovies
        console.log("moviesss", result); // Obtener la respuesta completa
        setData(result.response.movies); // Asignar la propiedad movies de la respuesta
        console.log("data", result.response.movies);
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