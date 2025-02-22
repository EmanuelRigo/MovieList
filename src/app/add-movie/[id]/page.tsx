"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { CreateMovie } from "../movies.api";

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
  director: string; // Añadir director
  year: number; // Añadir year
}

const Page: React.FC = () => {
  const [movieToAdd, setMovieToAdd] = useState<Movie | null>(null);
  const [pelicula, setPelicula] = useState<Movie | null>(null);

  const router = useRouter(); // Inicializa router
  const params = useParams();

  console.log(movieToAdd);

  const checkFormats = async () => {
    if (movieToAdd) {
      const { vhs, dvd, bluray } = movieToAdd.formats;
      if (vhs || dvd || bluray) {
        try {
          const data = await CreateMovie(movieToAdd);
          if (data) {
            router.refresh(); // Refresca la página actual
            router.push("/"); // Navega a la página principal
          } else {
            throw new Error("Failed to create");
          }
        } catch (error) {
          console.log(error);
        }

        alert(
          "¡Atención! Alguno de los formatos (VHS, DVD o Blu-ray) está disponible."
        );
      } else {
        alert("todo bien");
      }
    }
  };

  const handleFormatChange = (format: keyof Movie["formats"]) => {
    setMovieToAdd((prev) => {
      if (!prev) return null;
      const newValue = !prev.formats[format];
      return {
        ...prev,
        formats: {
          ...prev.formats,
          [format]: newValue,
        },
      };
    });
  };

  const urlBase = "https://api.themoviedb.org/3/movie/";
  const API_KEY = "67c383651f5d04b52d4a09b8a9d41b9a";

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const response = await fetch(
          `${urlBase}${params.id}?api_key=${API_KEY}`
        );
        const data = await response.json();

        setPelicula(data);
        setMovieToAdd({
          ...data,
          formats: {
            vhs: false,
            dvd: false,
            bluray: false,
          },
          director: data.director || "Unknown", // Asegurar que el director esté presente
          year: new Date(data.release_date).getFullYear(), // Asegurar que el año esté presente
        });
      } catch (error) {
        console.error("Ha ocurrido un error: ", error);
      }
    };

    if (params.id) {
      fetchPeliculas();
    }
  }, [params.id]);

  const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${quality || 75}`;
  };

  if (!pelicula) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex items-center">
      <div className="container rounded-lg bg-neutral-300 dark:bg-neutral-950 mx-auto flex w-full h-full lg:h-5/6 overflow-auto">
        <div className="relative m-4 flex w-2/5 rounded-lg aspect-w-9 aspect-h-16">
          <Image
            loader={myLoader}
            src={pelicula.poster_path ? pelicula.poster_path : "/images/poster.jpg"}
            alt={pelicula.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="text-black dark:text-white p-4 flex flex-col justify-between w-2/5">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl">{pelicula.title}</h1>
              <Link
                href="/add-movie"
                className="p-4 bg-blue-500 dark:bg-orange-500 rounded-lg text-white"
              >
                Volver
              </Link>
            </div>
            <p className="mb-4">{pelicula.release_date}</p>
            {pelicula.genres &&
              pelicula.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            <p>{pelicula.overview}</p>
          </div>
          <div>
            <div className="flex justify-start mb-4">
              <button
                onClick={() => handleFormatChange("vhs")}
                className={`${
                  movieToAdd?.formats.vhs ? "bg-blue-500 dark:bg-orange-500" : "bg-white dark:bg-neutral-900"
                } p-4 me-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-orange-500 hover:cursor-pointer`}
              >
                VHS
              </button>
              <button
                onClick={() => handleFormatChange("dvd")}
                className={`${
                  movieToAdd?.formats.dvd ? "bg-blue-500 dark:bg-orange-500" : "bg-white dark:bg-neutral-900"
                } p-4 me-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-orange-500 hover:cursor-pointer`}
              >
                DVD
              </button>
              <button
                onClick={() => handleFormatChange("bluray")}
                className={`${
                  movieToAdd?.formats.bluray ? "bg-blue-500 dark:bg-orange-500" : "bg-white dark:bg-neutral-900"
                } p-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-orange-500 hover:cursor-pointer`}
              >
                BLU-RAY
              </button>
            </div>
            <button
              onClick={checkFormats}
              className="p-5 bg-blue-500 dark:bg-orange-500 rounded-lg w-full text-white"
            >
              Agregar pelicula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;