"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  getMovieById,
  getMovieByIdUpdate,
  deleteMovieById,
} from "@/components/widgets/movies.api";
import { movieContext } from "@/context/MovieContext";
import { FaTrash } from "react-icons/fa";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
  genres: Genre[];
  formats: {
    vhs: boolean;
    dvd: boolean;
    bluray: boolean;
  };
}

const EditMovie: React.FC = () => {
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const movieContextValue = useContext(movieContext);
  if (!movieContextValue || !movieContextValue.setMovie) {
    throw new Error("movieContext is not properly initialized.");
  }
  const { setMovie } = movieContextValue;
  const id = pathname.split("/").pop();

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        try {
          const movie = await getMovieById(id);
          setMovieToEdit(movie.response);
        } catch (error) {
          console.error("Failed to fetch movie:", error);
        }
      }
    };

    fetchMovie();
  }, [id]);

  const handleFormatChange = (format: keyof Movie["formats"]) => {
    if (movieToEdit) {
      setMovieToEdit((prev) => {
        if (!prev) return prev;
        const newValue = !prev.formats[format];
        return {
          ...prev,
          formats: {
            ...prev.formats,
            [format]: newValue,
          },
        };
      });
    }
  };

  const checkFormats = async () => {
    if (movieToEdit) {
      const { vhs, dvd, bluray } = movieToEdit.formats;
      if (vhs || dvd || bluray) {
        alert(
          "¡Atención! Alguno de los formatos (VHS, DVD o Blu-ray) está disponible."
        );
        await onSubmitEdit(movieToEdit);
      } else {
        alert("Al menos tiene que tener un formato.");
      }
    }
  };

  const onSubmitEdit = async (movie: Movie) => {
    const { formats } = movie;
    try {
      const response = await getMovieByIdUpdate(id!, { formats });
      if (!response) {
        throw new Error("Failed to update.");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  const onSubmitDelete = async () => {
    try {
      await deleteMovieById(id!);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, bórralo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onSubmitDelete();
        Swal.fire("¡Borrado!", "La película ha sido borrada.", "success");
        setMovie(null);
      }
    });
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

  if (!movieToEdit) {
    return <div className="text-neutral-900">Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex items-center md:max-h-[956px]">
      <div className="container rounded-sm bg-neutral-300 dark:bg-neutral-950 mx-auto flex flex-col md:flex-row w-full h-full lg:h-5/6 overflow-auto gap-4 p-4">
        <div className="relative flex rounded-sm h-full aspect-h-6-9">
          <Image
            loader={myLoader}
            src={
              movieToEdit.poster_path
                ? movieToEdit.poster_path
                : "/images/poster.jpg"
            }
            alt={movieToEdit.title || "Movie Poster"}
            layout="fill"
            objectFit="cover"
            className="rounded-sm"
          />
        </div>
        <div className="text-black dark:text-neutral-200 flex flex-col justify-between w-full gap-2 md:gap-4">
          <div>
            <div className="flex justify-between items-center mb-1 md:mb-4">
              <h1 className="text-xl md:text-2xl">{movieToEdit.title}</h1>
              <Link
                href="/"
                className="p-2 md:p-4 bg-blue-500 dark:bg-yellow-500 rounded-sm text-neutral-900 text-sm md:text-base"
              >
                Volver
              </Link>
            </div>
            <p className="text-sm md:text-base mb-1 md:mb-4">
            {movieToEdit.release_date && movieToEdit.release_date.split("T")[0]}            </p>
            <div className="flex mb-1">
              {movieToEdit.genres &&
                movieToEdit.genres.map((genre) => (
                  <p key={genre.id} className="text-sm md:text-base pe-1">
                    {genre.name}
                  </p>
                ))}
            </div>
            <div className="h-[80px] md:h-96 overflow-y-auto">
              <p className="text-xs md:text-base text-neutral-500">
                {movieToEdit.overview}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-start mb-2 md:mb-4 gap-2 md:gap-4 items-stretch dark:text-neutral-800">
              <button
                onClick={() => handleFormatChange("vhs")}
                className={`${
                  movieToEdit.formats?.vhs
                    ? "bg-blue-500 dark:bg-yellow-500"
                    : "bg-white dark:bg-neutral-900"
                } p-2 md:p-4 w-28 h-full rounded-sm outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-yellow-500 hover:cursor-pointer`}
              >
                VHS
              </button>
              <button
                onClick={() => handleFormatChange("dvd")}
                className={`${
                  movieToEdit.formats?.dvd
                    ? "bg-blue-500 dark:bg-yellow-500"
                    : "bg-white dark:bg-neutral-900"
                } p-2 md:p-4 w-28 h-full rounded-sm outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-yellow-500 hover:cursor-pointer`}
              >
                DVD
              </button>
              <button
                onClick={() => handleFormatChange("bluray")}
                className={`${
                  movieToEdit.formats?.bluray
                    ? "bg-blue-500 dark:bg-yellow-500"
                    : "bg-white dark:bg-neutral-900"
                } p-2 md:p-4 w-28 h-full rounded-sm outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-yellow-500 hover:cursor-pointer`}
              >
                BLU-RAY
              </button>
              <button
                onClick={handleDelete}
                className="p-2 md:p-4 w-28 bg-red-500 dark:bg-red-700 rounded-sm text-black dark:text-neutral-900 flex items-center justify-center outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-yellow-500 hover:cursor-pointer h-auto"
              >
                <FaTrash />
              </button>
            </div>
            <div className="flex">
              <button
                onClick={checkFormats}
                className="p-3 md:p-5 bg-blue-500 dark:bg-yellow-500 rounded-sm md:rounded-sm w-full text-black dark:text-neutral-900"
              >
                Terminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
