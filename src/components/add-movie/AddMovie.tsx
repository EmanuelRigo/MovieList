"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { BiCameraMovie } from "react-icons/bi";
import { LuSearchX, LuSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

interface AddMovieProps {
  apiKey: string;
}

export const AddMovie: React.FC<AddMovieProps> = ({ apiKey }) => {
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = apiKey;

  const [busqueda, setBusqueda] = useState<string>("");
  const [peliculas, setPeliculas] = useState<Movie[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const router = useRouter();

  // ✅ Al cargar el componente, revisa si hay un query param en la URL (?query=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");

    if (query) {
      setBusqueda(query);
      fetchPeliculasWithQuery(query);
    }
  }, []);

  // ✅ Maneja el cambio del input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  // ✅ Maneja el submit del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    const encodedQuery = encodeURIComponent(busqueda);

    // ✅ Actualiza la URL sin recargar la página, agregando el parámetro `query`
    console.log("reee");
    // router.push("/")
    console.log("Actualizando URL con:", encodedQuery);
    router.replace(`?query=${encodedQuery}`);

    // ✅ Ejecuta la búsqueda
    fetchPeliculas();
  };

  // ✅ Hace la búsqueda usando el estado actual
  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setPeliculas(data.results);
      setHasSearched(true);
    } catch (error) {
      console.error("Ha ocurrido un error: ", error);
    }
  };

  // ✅ Hace la búsqueda con un query externo (como el de la URL)
  const fetchPeliculasWithQuery = async (query: string) => {
    try {
      const response = await fetch(
        `${urlBase}?query=${query}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setPeliculas(data.results);
      setHasSearched(true);
    } catch (error) {
      console.error("Error al buscar películas:", error);
    }
  };

  // ✅ Loader para las imágenes de TMDB
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
    <div className="h-[calc(100vh-56px)] overflow-auto md:h-screen w-screen flex items-center">
      <div className="container rounded-lg bg-neutral-300 dark:bg-neutral-950 p-4 mx-auto h-full lg:h-5/6 flex flex-col items-start lg:items-center justify-center">
        <div className="flex justify-between items-center w-full pb-6">
          {/* 🔍 Barra de búsqueda */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-grow items-center bg-neutral-100 dark:bg-neutral-950 rounded-md border-2 border-neutral-400"
          >
            <input
              type="text"
              placeholder="Search for the movie to add."
              className="flex-grow px-4 py-2 text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-950 rounded-l-full outline-none"
              value={busqueda}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="flex items-center justify-center w-12 h-12 text-neutral-900 dark:text-neutral-100 hover:text-blue-600 rounded-full dark:hover:text-orange-500 focus:ring-2 focus:ring-orange-700"
            >
              <LuSearch />
            </button>
          </form>

          {/* 🔙 Botón de volver */}
          <Link
            className="flex items-center justify-center w-2/12 h-12 text-blue-500 dark:text-yellow-500 hover:text-blue-600 dark:hover:text-orange-500 text-3xl ps-2"
            href="/"
          >
            <IoIosArrowBack />
          </Link>
        </div>

        {/* 🎬 Lista de resultados */}
        <div className="relative flex-grow w-full overflow-auto scrollbar-hidden">
          {!hasSearched ? (
            <div className="h-full flex flex-col items-center justify-center">
              <BiCameraMovie className="text-8xl mb-4 text-blue-500 dark:text-yellow-500" />
              <p className="text-center text-lg text-neutral-700 dark:text-neutral-100">
                Find your movie to add it.
              </p>
            </div>
          ) : peliculas.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <LuSearchX className="text-8xl mb-4 text-blue-500 dark:text-yellow-500" />
              <p className="text-center text-neutral-900 dark:text-neutral-100 text-lg">
                There are no movies with that name.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 absolute w-full p-1">
              {peliculas.map((pelicula) => (
                <Link
                  key={pelicula.id}
                  href={`/add-movie/${pelicula.id}`}
                  className="h-80 pt-0 rounded-md overflow-hidden outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-yellow-500 hover:cursor-pointer"
                >
                  <div className="h-full w-full flex relative">
                    <div className="absolute bottom-0 bg-black bg-opacity-45 w-full text-white">
                      <p>{pelicula.title}</p>
                      <p>{pelicula.release_date}</p>
                    </div>
                    {pelicula.poster_path && (
                      <Image
                        loader={myLoader}
                        src={pelicula.poster_path}
                        alt={pelicula.title}
                        width={500}
                        height={750}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
