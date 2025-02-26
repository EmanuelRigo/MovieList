"use client";
// EditMovie.tsx
import Image from "next/image";
import Link from "next/link";
import EditButtons from "@/components/edit-movie/EditButtons";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getMovieById } from "@/app/add-movie/movies.api";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
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
  const id = pathname.split("/").pop();
  console.log(id);

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        try {
          const movie = await getMovieById(id);
          setMovieToEdit(movie.response);
          console.log("movie:",movie.response);
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

  const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${quality || 75}`;
  };

  if (!movieToEdit) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex items-center">
      {console.log(movieToEdit, "movieToEdit")}
      <div className="container rounded-lg bg-gray-900 mx-auto flex w-full h-full lg:h-5/6 overflow-auto">
        <div className="rounded-lg aspect-4/6 relative m-4 outline outline-offset-3 outline-orange-500">
          <Image
            loader={myLoader}
            src={movieToEdit.poster_path}
            alt={movieToEdit.title || "Movie Poster"} // Asegúrate de que 'movieToEdit.title' esté definido
            width={500}
            height={750}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="text-white p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl">{movieToEdit.title}</h1>
              <Link href="/" className="p-4 bg-orange-500 rounded-lg text-black">
                Volver
              </Link>
            </div>
            <p className="mb-4">{movieToEdit.release_date}</p>
            {movieToEdit.genres &&
              movieToEdit.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            <p>{movieToEdit.overview}</p>
          </div>
          <div>
            <div className="flex justify-between mb-4">
              <div className="flex justify-start">
                <button
                  onClick={() => handleFormatChange("vhs")}
                  className={`${
                    movieToEdit.formats?.vhs ? "bg-orange-500" : "bg-gray-800"
                  } p-4 me-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-orange-500 hover:cursor-pointer`}
                >
                  VHS
                </button>
                <button
                  onClick={() => handleFormatChange("dvd")}
                  className={`${
                    movieToEdit.formats?.dvd ? "bg-orange-500" : "bg-gray-800"
                  } p-4 me-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-orange-500 hover:cursor-pointer`}
                >
                  DVD
                </button>
                <button
                  onClick={() => handleFormatChange("bluray")}
                  className={`${
                    movieToEdit.formats?.bluray ? "bg-orange-500" : "bg-gray-800"
                  } p-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-orange-500 hover:cursor-pointer`}
                >
                  BLU-RAY
                </button>
              </div>
              <button
                onClick={() => handleFormatChange("vhs")}
                className={`${
                  movieToEdit.formats?.vhs ? "bg-yellow-500" : "bg-red-800"
                } p-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-orange-500 hover:cursor-pointer`}
              >
                eliminar
              </button>
            </div>
            <EditButtons movie={movieToEdit} id={id}></EditButtons>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;