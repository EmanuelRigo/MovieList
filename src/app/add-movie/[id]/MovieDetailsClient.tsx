"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CreateMovie } from "@/components/widgets/movies.api";
import SvgDvd from "@/utils/svgs/SvgDvd";
import BluRaySvg from "@/utils/svgs/SvgBluRay";
import VhsSvg from "@/utils/svgs/SvgVhs";

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
      alert(
        "¡Atención! Alguno de los formatos (VHS, DVD o Blu-ray) debe estar disponible."
      );
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

  const myLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  return (
    <div className="h-screen w-screen flex items-center md:max-h-[956px]">
      <div className="container rounded-sm bg-neutral-300 dark:bg-neutral-950 mx-auto flex flex-col md:flex-row w-full h-full lg:h-5/6 overflow-auto gap-4 p-4">
        <div className="relative flex rounded-sm h-full aspect-h-6-9">
          <Image
            loader={myLoader}
            src={movie.poster_path ? movie.poster_path : "/images/poster.jpg"}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="rounded-sm"
          />
        </div>
        <div className="text-black dark:text-neutral-200 flex flex-col justify-between w-full gap-2 md:gap-4">
          <div>
            <div className="flex justify-between items-center mb-1 md:mb-4">
              <h1 className="text-xl md:text-2xl">{movie.title}</h1>
              <Link
                href="/"
                className="p-2 md:p-4 bg-blue-500 dark:bg-yellow-500 rounded-sm text-neutral-900 text-sm md:text-base"
              >
                Volver
              </Link>
            </div>
            <p className="text-sm md:text-base mb-1 md:mb-4">
              {movie.release_date}
            </p>
            <div className="flex mb-1">
              {movie.genres.map((genre) => (
                <p key={genre.id} className="text-sm md:text-base pe-1">
                  {genre.name}
                </p>
              ))}
            </div>
            <div className="h-[80px] md:h-96 overflow-y-auto">
              <p className="text-xs md:text-base text-neutral-500">
                {movie.overview}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2 md:mb-4 gap-2 md:gap-4 items-stretch dark:text-neutral-800">
            <button
              onClick={() => handleFormatChange("vhs")}
              className={`p-2 md:p-2 w-28 h-10 rounded-sm outline outline-none hover:outline-offset-3 hover:cursor-pointer ${
                movieToAdd.formats.vhs
                  ? "text-blue-500 dark:text-yellow-500 bg-neutral-900"
                  : "text-white dark:text-neutral-700 bg-neutral-900"
              } hover:outline-blue-500 dark:hover:outline-yellow-500`}
            >
              <VhsSvg className="w-16 h-5 mx-auto" />
            </button>
            <button
              onClick={() => handleFormatChange("dvd")}
              className={`p-2 md:p-2 w-28 h-10 rounded-sm outline outline-none hover:outline-offset-3 hover:cursor-pointer ${
                movieToAdd.formats.dvd
                  ? "text-blue-500 dark:text-yellow-500 bg-neutral-900"
                  : "text-white dark:text-neutral-700 bg-neutral-900"
              } hover:outline-blue-500 dark:hover:outline-yellow-500`}
            >
              <SvgDvd className="w-16 h-5 mx-auto" />
            </button>
            <button
              onClick={() => handleFormatChange("bluray")}
              className={`p-2 md:p-2 w-28 h-10 rounded-sm outline outline-none hover:outline-offset-3 hover:cursor-pointer ${
                movieToAdd.formats.bluray
                  ? "text-blue-500 dark:text-yellow-500 bg-neutral-900"
                  : "text-white dark:text-neutral-700 bg-neutral-900"
              } hover:outline-blue-500 dark:hover:outline-yellow-500`}
            >
              <BluRaySvg className="w-16 h-5 mx-auto" />
            </button>
            </div>
            <div className="flex">
              <button
                onClick={checkFormats}
                className="p-3 md:p-5 bg-blue-500 dark:bg-yellow-500 rounded-sm md:rounded-sm w-full text-black dark:text-neutral-900"
              >
                Agregar película
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
