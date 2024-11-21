"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const uri = "/api/movie";

const AddEditMovie = () => {
  const [movieToAdd, setMovieToAdd] = useState(null);
  const [pelicula, setPelicula] = useState(null);

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname(); // Obtener la ruta actual

  // Verificar si es "Agregar" o "Editar"
  const isAddMode = pathname.includes("/add-movie");

  console.log(movieToAdd);

  const checkFormats = async () => {
    if (movieToAdd) {
      const { vhs, dvd, bluray } = movieToAdd.formats;
      if (vhs || dvd || bluray) {
        try {
          const response = await fetch(uri, {
            method: isAddMode ? "POST" : "PUT", // Si es "agregar", usamos POST; si es "editar", usamos PUT
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(movieToAdd),
          });
          if (response.ok) {
            router.refresh();
            router.push("/"); // Redirigir después de agregar o editar
          } else {
            throw new Error(
              isAddMode
                ? "No se pudo agregar la película"
                : "No se pudo editar la película"
            );
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

  const handleFormatChange = (format) => {
    setMovieToAdd((prev) => {
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
        });
      } catch (error) {
        console.error("Ha ocurrido un error: ", error);
      }
    };

    if (params.id) {
      fetchPeliculas();
    }
  }, [params.id]);

  const myLoader = ({ src, width, quality }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  if (!pelicula) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex items-center">
      <div className="container rounded-lg bg-gray-900 mx-auto flex w-full h-full lg:h-5/6 overflow-auto">
        <div className="rounded-lg aspect-4/6 relative m-4 outline outline-offset-3 outline-orange-500">
          <Image
            loader={myLoader}
            src={
              pelicula.poster_path ? pelicula.poster_path : "/images/poster.jpg"
            }
            alt={pelicula.title}
            width={500}
            height={750}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="text-white p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl">{pelicula.title}</h1>
              <Link
                href="/add-movie"
                className="p-4 bg-orange-500 rounded-lg text-black"
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
                  movieToAdd?.formats.vhs ? "bg-orange-500" : "bg-gray-800"
                } p-4 me-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-orange-500 hover:cursor-pointer`}
              >
                VHS
              </button>
              <button
                onClick={() => handleFormatChange("dvd")}
                className={`${
                  movieToAdd?.formats.dvd ? "bg-orange-500" : "bg-gray-800"
                } p-4 me-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-orange-500 hover:cursor-pointer`}
              >
                DVD
              </button>
              <button
                onClick={() => handleFormatChange("bluray")}
                className={`${
                  movieToAdd?.formats.bluray ? "bg-orange-500" : "bg-gray-800"
                } p-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-orange-500 hover:cursor-pointer`}
              >
                BLU-RAY
              </button>
            </div>
            <button
              onClick={checkFormats}
              className="p-5 bg-orange-500 rounded-lg w-full text-black"
            >
              {isAddMode ? "Agregar película" : "Editar película"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditMovie;
