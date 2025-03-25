"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CreateMovie } from "@/components/widgets/movies.api";

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

export default function MovieDetailsClient({ movie }: { movie: Movie }) {
  const [movieToAdd, setMovieToAdd] = useState<Movie>({
    ...movie,
    formats: { vhs: false, dvd: false, bluray: false },
    director: movie.director || "Unknown",
    year: new Date(movie.release_date).getFullYear(),
  });

  const router = useRouter();

  const checkFormats = async () => {
    const { vhs, dvd, bluray } = movieToAdd.formats;
    if (vhs || dvd || bluray) {
      try {
        const data = await CreateMovie(movieToAdd);
        if (data) {
          router.refresh();
          router.push("/");
        } else {
          throw new Error("Failed to create");
        }
      } catch (error) {
        console.log(error);
      }
      alert("Película agregada correctamente.");
    } else {
      alert("¡Atención! Alguno de los formatos (VHS, DVD o Blu-ray) debe estar disponible.");
    }
  };

  const handleFormatChange = (format: keyof Movie["formats"]) => {
    setMovieToAdd((prev) => ({
      ...prev,
      formats: {
        ...prev.formats,
        [format]: !prev.formats[format],
      },
    }));
  };

  const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className="h-screen w-screen flex items-center">
      <div className="container md:max-h-[956px] rounded-lg bg-neutral-300 dark:bg-neutral-950 mx-auto flex w-full h-full lg:h-5/6 overflow-auto">
        <div className="relative m-4 flex w-2/5 rounded-lg aspect-w-9 aspect-h-16">
          <Image
            loader={myLoader}
            src={movie.poster_path ? movie.poster_path : "/images/poster.jpg"}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="text-black dark:text-white p-4 flex flex-col justify-between w-full">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl">{movie.title}</h1>
              <Link href="/add-movie" className="p-4 bg-blue-500 dark:bg-orange-500 rounded-lg text-white">
                Volver
              </Link>
            </div>
            <p className="mb-4">{movie.release_date}</p>
            {movie.genres.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
            <p>{movie.overview}</p>
          </div>
          <div>
            <div className="flex justify-start mb-4">
              {(["vhs", "dvd", "bluray"] as Array<keyof Movie["formats"]>).map((format) => (
                <button
                  key={format}
                  onClick={() => handleFormatChange(format)}
                  className={`${
                    movieToAdd.formats[format] ? "bg-blue-500 dark:bg-orange-500" : "bg-white dark:bg-neutral-900"
                  } p-4 me-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-orange-500 hover:cursor-pointer`}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={checkFormats} className="p-5 bg-blue-500 dark:bg-orange-500 rounded-lg w-full text-white">
              Agregar película
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
