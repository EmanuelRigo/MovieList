"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CreateMovie } from "@/components/widgets/movies.api";
import SvgDvd from "@/utils/svgs/SvgDvd";
import BluRaySvg from "@/utils/svgs/SvgBluRay";
import VhsSvg from "@/utils/svgs/SvgVhs";
import { IoIosArrowBack } from "react-icons/io";
import Modal from "@/components/widgets/Modal";
import { Movie, MovieDB } from "@/context/interfaces/movieTypes";

export default function MovieDetailsClient({ movie }: { movie: Movie }) {
  const [movieToAdd, setMovieToAdd] = useState<MovieDB>({
    _id: {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      backdrop_path: movie.backdrop_path || "",
      poster_path: movie.poster_path || "",
      overview: movie.overview,
      genres: movie.genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
        _id: { $oid: "" },
      })),
      belongs_to_collection: movie.belongs_to_collection || undefined,
      budget: movie.budget || 0,
      homepage: movie.homepage || "",
      imdb_id: movie.imdb_id || "",
      origin_country: movie.origin_country || [],
      original_language: movie.original_language || "",
      original_title: movie.original_title || "",
      popularity: movie.popularity || 0,
      production_companies:
        movie.production_companies?.map((company) => ({
          id: company.id,
          logo_path: company.logo_path || null,
          name: company.name,
          origin_country: company.origin_country,
          _id: { $oid: "" },
        })) || [],
      production_countries:
        movie.production_countries?.map((country) => ({
          iso_3166_1: country.iso_3166_1,
          name: country.name,
          _id: { $oid: "" },
        })) || [],
      revenue: movie.revenue || 0,
      runtime: movie.runtime || 0,
      spoken_languages:
        movie.spoken_languages?.map((language) => ({
          english_name: language.english_name,
          iso_639_1: language.iso_639_1,
          name: language.name,
          _id: { $oid: "" },
        })) || [],
      status: movie.status || "",
      tagline: movie.tagline || "",
      video: movie.video || false,
      vote_average: movie.vote_average || 0,
      vote_count: movie.vote_count || 0,
      createdAt: { $date: "" },
      updatedAt: { $date: "" },
    },
    formats: { vhs: false, dvd: false, bluray: false },
    checked: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  const checkFormats = async () => {
    const { vhs, dvd, bluray } = movieToAdd.formats;

    if (vhs || dvd || bluray) {
      try {
        if (!movieToAdd || !movieToAdd._id) {
          throw new Error("Movie data is incomplete.");
        }

        const data = await CreateMovie(movieToAdd);
        console.log("🚀 ~ checkFormats ~ data:", data);

        if (data) {
          setModalMessage(data.message);
          setIsModalOpen(true);
        } else {
          throw new Error("Movie could not be added.");
        }
      } catch (error) {
        console.error("Error while adding the movie:", error);
        setModalMessage("An error occurred while adding the movie.");
        setIsModalOpen(true);
      }
    } else {
      setModalMessage(
        "At least one format (VHS, DVD, or Blu-ray) must be selected."
      );
      setIsModalOpen(true);
    }
  };

  const handleFormatChange = (format: keyof MovieDB["formats"]) => {
    setMovieToAdd((prev) => {
      return {
        ...prev,
        formats: {
          vhs: prev.formats?.vhs ?? false,
          dvd: prev.formats?.dvd ?? false,
          bluray: prev.formats?.bluray ?? false,
          [format]: !prev.formats?.[format],
        },
      };
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

  return (
    <div className="h-[calc(100vh-56px)] lg:h-screen overflow-auto w-screen flex items-center">
      <div className="w-full 1-5xl:container h-full md:max-h-[956px] 2xl:h-5/6 rounded-lg bg-neutral-300 dark:bg-neutral-900 mx-auto gap-4 p-4 flex flex-col lg:flex-row overflow-auto">
        <div className="relative flex rounded-lg h-full aspect-h-6-9">
          {movie.poster_path ? (
            <Image
              loader={myLoader}
              src={movie.poster_path ? movie.poster_path : "/images/poster.jpg"}
              alt={movie.title}
              fill
              priority
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 rounded-lg">
              <p>no image</p>
            </div>
          )}
        </div>
        <div className="text-black dark:text-neutral-200 flex flex-col justify-between w-full gap-2 md:gap-4">
          <div>
            <div className="flex justify-between items-center mb-1 md:mb-4">
              <h1 className="text-xl md:text-2xl">{movie.title}</h1>
              <button onClick={() => router.back()}>
                <IoIosArrowBack className=" text-blue-500 dark:text-yellow-500 text-3xl" />
              </button>
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
            <div className="flex justify-between lg:justify-start mb-2 md:mb-4 gap-2 md:gap-4 items-stretch dark:text-neutral-800">
              <button
                onClick={() => handleFormatChange("vhs")}
                className={`p-2 md:p-2 w-28 h-10 rounded-lg outline outline-none hover:outline-offset-3 hover:cursor-pointer ${
                  movieToAdd.formats?.vhs ?? false
                    ? "text-blue-500 dark:text-yellow-500"
                    : "text-neutral-400 dark:text-neutral-700"
                } hover:outline-blue-500 dark:hover:outline-yellow-500 bg-neutral-100 dark:bg-neutral-900`}
              >
                <VhsSvg className="w-16 h-5 mx-auto" />
              </button>
              <button
                onClick={() => handleFormatChange("dvd")}
                className={`p-2 md:p-2 w-28 h-10 rounded-lg outline outline-none hover:outline-offset-3 hover:cursor-pointer ${
                  movieToAdd.formats?.dvd ?? false
                    ? "text-blue-500 dark:text-yellow-500"
                    : "text-neutral-400 dark:text-neutral-700"
                } hover:outline-blue-500 dark:hover:outline-yellow-500 bg-neutral-100 dark:bg-neutral-900`}
              >
                <SvgDvd className="w-16 h-5 mx-auto" />
              </button>
              <button
                onClick={() => handleFormatChange("bluray")}
                className={`p-2 md:p-2 w-28 h-10 rounded-lg outline outline-none hover:outline-offset-3 hover:cursor-pointer ${
                  movieToAdd.formats?.bluray ?? false
                    ? "text-blue-500 dark:text-yellow-500"
                    : "text-neutral-400 dark:text-neutral-700"
                } hover:outline-blue-500 dark:hover:outline-yellow-500 bg-neutral-100 dark:bg-neutral-900`}
              >
                <BluRaySvg className="w-16 h-5 mx-auto" />
              </button>
            </div>
            <div className="flex">
              <button
                onClick={checkFormats}
                className="p-3 md:p-5 bg-blue-500 dark:bg-yellow-500 rounded-lg md:rounded-lg w-full text-black dark:text-neutral-900"
              >
                Add movie
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=""
        actions={[
          {
            label: "Ok",
            onClick: () => {
              setIsModalOpen(false);
              if (
                modalMessage === "Added to list" ||
                modalMessage === "Movie already exists"
              ) {
                console.log(
                  "🚀 ~ MovieDetailsClient ~ modalMessage:",
                  modalMessage
                );
                router.push("/");
              }
            },
          },
        ]}
      >
        {modalMessage}
      </Modal>
    </div>
  );
}
