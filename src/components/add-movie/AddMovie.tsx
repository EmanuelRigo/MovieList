"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

export const AddMovie = () => {
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "67c383651f5d04b52d4a09b8a9d41b9a";

  const [busqueda, setBusqueda] = useState<string>("");
  const [peliculas, setPeliculas] = useState<Movie[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${API_KEY}`
      );
      const data = await response.json();
      console.log(data.results);
      setPeliculas(data.results);
    } catch (error) {
      console.error("Ha ocurrido un error: ", error);
    }
  };

  const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className="h-screen w-screen flex items-center">
      <div className="container rounded-lg bg-neutral-900 p-4 mx-auto h-full lg:h-5/6 flex flex-col items-start lg:items-center justify-center">
        <div className="flex justify-between align-center w-full pb-6">
          <form
            onSubmit={handleSubmit}
            className="flex w-4/5 lg:w-2/4 bg-white items-center rounded-lg overflow-hidden shadow-sm text-black"
          >
            <input
              type="text"
              placeholder="Busca la pelicula a agregar"
              className="w-full py-3 px-4 focus:outline-none"
              value={busqueda}
              onChange={handleInputChange}
            />
            <button type="submit" className="py-3 px-4 text-black">
              <BsSearch />
            </button>
          </form>
          <Link className="p-4 bg-orange-500 rounded-lg" href="/">
            volver
          </Link>
        </div>
        <div className="relative flex-grow w-full overflow-auto scrollbar-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 absolute w-full p-1">
            {peliculas.map((pelicula) => (
              <Link
                key={pelicula.id}
                href={`/add-movie/${pelicula.id}`}
                className="h-80 pt-0 rounded-lg overflow-hidden outline outline-none hover:outline-offset-3 hover:outline-orange-500 hover:cursor-pointer"
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
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};