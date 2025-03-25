"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface MovieFormats {
  vhs: boolean;
  dvd: boolean;
  bluray: boolean;
}

interface ClientMovieProps {
  movieId: string;
}

export function ClientMovie({ movieId }: ClientMovieProps) {
  const [formats, setFormats] = useState<MovieFormats>({
    vhs: false,
    dvd: false,
    bluray: false,
  });

  const router = useRouter();

  const handleFormatChange = (format: keyof MovieFormats) => {
    setFormats((prev) => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  const handleAddMovie = async () => {
    if (formats.vhs || formats.dvd || formats.bluray) {
      try {
        const response = await fetch("/api/movies/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId, formats }),
        });

        if (!response.ok) {
          throw new Error("Failed to add movie");
        }

        alert("Película agregada correctamente.");
        router.push("/");
      } catch (error) {
        console.error("Error al agregar la película:", error);
      }
    } else {
      alert("¡Atención! Debes seleccionar al menos un formato (VHS, DVD o Blu-ray).");
    }
  };

  return (
    <div>
      <div className="flex justify-start mb-4">
        <button
          onClick={() => handleFormatChange("vhs")}
          className={`${
            formats.vhs ? "bg-blue-500 dark:bg-orange-500" : "bg-white dark:bg-neutral-900"
          } p-4 me-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-orange-500 hover:cursor-pointer`}
        >
          VHS
        </button>
        <button
          onClick={() => handleFormatChange("dvd")}
          className={`${
            formats.dvd ? "bg-blue-500 dark:bg-orange-500" : "bg-white dark:bg-neutral-900"
          } p-4 me-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-orange-500 hover:cursor-pointer`}
        >
          DVD
        </button>
        <button
          onClick={() => handleFormatChange("bluray")}
          className={`${
            formats.bluray ? "bg-blue-500 dark:bg-orange-500" : "bg-white dark:bg-neutral-900"
          } p-4 w-28 rounded-lg outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-orange-500 hover:cursor-pointer`}
        >
          BLU-RAY
        </button>
      </div>
      <button
        onClick={handleAddMovie}
        className="p-5 bg-blue-500 dark:bg-orange-500 rounded-lg w-full text-white"
      >
        Agregar película
      </button>
    </div>
  );
}