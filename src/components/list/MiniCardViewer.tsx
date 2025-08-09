"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { IoIosArrowBack } from "react-icons/io";
import { FaFilm, FaImage, FaTimes } from "react-icons/fa";

const MiniCardViewer = () => {
  const { movie } = useMovieContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const myLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    const url = `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${
      quality || 75
    }`;
    return url;
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  if (movie && movie._id) {
    const imagePath = movie._id.poster_path?.startsWith("/")
      ? movie._id.poster_path
      : `/${movie._id.poster_path}`;

    return (
      <>
        <div
          className="relative h-full w-full overflow-hidden rounded-md"
          onClick={handleImageClick}
        >
          <Image
            loader={myLoader}
            src={imagePath || "/images/default-backdrop.jpg"}
            fill
            style={{ objectFit: "cover" }}
            alt={movie._id.title || "Movie Poster"}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-md"
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
              <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
                {movie._id.title}
              </h2>

              <p className="text-black dark:text-neutral-200 mb-2">
                {movie._id.overview || "No description"}
              </p>
              <div className="flex justify-between">
                <p className="text-black dark:text-neutral-200 mb-2">
                  {movie._id.release_date?.split("T")[0] || "Unknown"}
                </p>
                <p className="text-black dark:text-neutral-200 mb-2">
                  {movie._id.runtime} min
                </p>
              </div>
              <p className="text-black dark:text-neutral-200">
                <strong>Formats:</strong>{" "}
                <span
                  className={`${
                    movie.formats.vhs
                      ? "text-blue-500 dark:text-yellow-500"
                      : "text-neutral-400 dark:text-neutral-600"
                  }`}
                >
                  VHS
                </span>{" "}
                <span
                  className={`${
                    movie.formats.dvd
                      ? "text-blue-500 dark:text-yellow-500"
                      : "text-neutral-400 dark:text-neutral-600"
                  }`}
                >
                  DVD
                </span>{" "}
                <span
                  className={`${
                    movie.formats.bluray
                      ? "text-blue-500 dark:text-yellow-500"
                      : "text-neutral-400 dark:text-neutral-600"
                  }`}
                >
                  BLU-RAY
                </span>
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleToggleFullScreen}
                  className="p-2 text-blue-500 dark:text-yellow-500 text-4xl"
                >
                  <FaImage />
                </button>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-blue-500 dark:text-yellow-500 text-4xl"
                >
                  <IoIosArrowBack />
                </button>
              </div>
            </div>
          </div>
        )}

        {isFullScreen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-90 p-4"
            onClick={handleToggleFullScreen}
          >
            <button
              onClick={handleToggleFullScreen}
              className="absolute top-4 right-4 text-white text-4xl z-10"
            >
              <FaTimes />
            </button>
            <div className="relative w-full h-2/3">
              <Image
                loader={myLoader}
                src={imagePath || "/images/default-backdrop.jpg"}
                layout="fill"
                objectFit="contain"
                alt={movie._id.title || "Movie Poster"}
              />
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <h1 className="flex justify-center items-center text-4xl text-neutral-400 dark:text-neutral-700">
        {" "}
        <FaFilm />
      </h1>
    );
  }
};

export default MiniCardViewer;
