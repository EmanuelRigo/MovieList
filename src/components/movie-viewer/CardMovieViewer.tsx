"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useMovieContext } from "@/context/MovieContext";
import { FaFilm, FaPlay, FaCompactDisc } from "react-icons/fa";
import { FiCalendar, FiClock, FiStar, FiVideo, FiDisc } from "react-icons/fi";

const CardMovieViewer: React.FC = () => {
  const { movie } = useMovieContext();
  console.log("🚀 ~ CardMovieViewer ~ movie:", movie);

  if (!movie) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex aspect-[2/3] items-center justify-center rounded-3xl border border-neutral-800 bg-neutral-900">
          <FaFilm className="text-7xl text-neutral-600" />
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-3xl font-bold text-text-primary">Movie</h3>
          <p className="mt-2 text-sm text-text-muted">
            Select a movie to view its details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col ">
      {/* Scrollable upper content */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-invisible">
        {/* Poster */}
        <div className="bg-gradient-to-b from-accent-primary/10 via-accent-primary/10 to-transparent p-6">
          <div className="relative aspect-[2/3] overflow-hidden rounded-xl  bg-background-secondary">
            {movie._id.poster_path ? (
              <Image
                key={movie._id.poster_path}
                src={`https://image.tmdb.org/t/p/w500${movie._id.poster_path}`}
                alt={movie._id.title || "Movie Poster"}
                width={500}
                height={750}
                unoptimized
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-in-out"
                onLoadingComplete={(img) => img.classList.remove("opacity-0")}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <FaFilm className="text-7xl text-neutral-600" />
              </div>
            )}
          </div>
        </div>
        {/* Título */}
        <div className="px-6">
          <MarqueeTitle text={movie._id.title} />

          {/* Información */}
          <div className="mt-3 flex flex-wrap items-center gap-5  text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <FiCalendar size={14} />
              {movie._id.release_date?.split("T")[0]}
            </div>

            <div className="flex items-center gap-2 text-accent-primary">
              <FiClock size={14} />
              {movie._id.runtime} min
            </div>

            <div className="flex items-center gap-2">
              <FiStar size={14} />
              {movie._id.vote_average?.toFixed(1) ?? "-"}
            </div>
          </div>

          {/* Sinopsis */}
          <div className="mt-4 flex flex-col">
            <span className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">
              Synopsis
            </span>
            <div className="pr-2">
              <p className="text-sm leading-6 text-text-secondary">
                {movie._id.overview}
              </p>
            </div>
          </div>
        </div>{" "}
      </div>

      {/* Formatos */}
      <div className="mt-4 border-t border-neutral-800 pt-4 px-6">
        <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Collection Formats
        </span>

        <div className="flex gap-2">
          {/* VHS */}
          <div
            className={`flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-semibold transition ${
              movie.formats.vhs
                ? "border-yellow-500 bg-yellow-500 text-black"
                : "border-neutral-700 bg-neutral-900 text-neutral-500"
            }`}
            title="VHS"
          >
            <FiVideo size={18} />
            <span>VHS</span>
          </div>

          {/* DVD */}
          <div
            className={`flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-semibold transition ${
              movie.formats.dvd
                ? "border-yellow-500 bg-yellow-500 text-black"
                : "border-neutral-700 bg-neutral-900 text-neutral-500"
            }`}
            title="DVD"
          >
            <FiDisc size={18} />
            <span>DVD</span>
          </div>

          {/* BLU-RAY */}
          <div
            className={`flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-semibold transition ${
              movie.formats.bluray
                ? "border-yellow-500 bg-yellow-500 text-black"
                : "border-neutral-700 bg-neutral-900 text-neutral-500"
            }`}
            title="Blu-ray"
          >
            <FaCompactDisc size={18} />
            <span>BLU-RAY</span>
          </div>
        </div>

        {/* Botón Watch Trailer */}
        <button className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-yellow-600 text-base font-semibold text-yellow-500 transition-all duration-300 hover:bg-yellow-500 hover:text-black">
          <FaPlay size={14} />
          <span>Watch Trailer</span>
        </button>
      </div>
    </div>
  );
};

/**
 * Título con animación marquee.
 *
 * - Si el texto entra: se muestra normal, sin animación.
 * - Si NO entra: después de 2s con el cursor fuera, desplaza el texto
 *   de derecha a izquierda, hace una pausa, y reinicia el ciclo.
 * - Al hacer hover, vuelve al inicio.
 */
interface MarqueeTitleProps {
  text: string;
}

const MarqueeTitle: React.FC<MarqueeTitleProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animationDelayPassed, setAnimationDelayPassed] = useState(false);

  // Detectar si el texto se desborda.
  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      const inner = textRef.current;
      if (!container || !inner) return;
      setOverflows(inner.scrollWidth > container.clientWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text]);

  // Delay de 2s antes de empezar a animar (sólo si hay overflow y no hay hover).
  useEffect(() => {
    if (!overflows || isHovered) {
      setAnimationDelayPassed(false);
      return;
    }

    const timeout = setTimeout(() => {
      setAnimationDelayPassed(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [overflows, isHovered, text]);

  // Si no hay overflow, mostrar título normal sin wrapper especial.
  if (!overflows) {
    return (
      <h1
        ref={containerRef as React.RefObject<HTMLHeadingElement>}
        className="text-4xl font-bold leading-tight text-white"
      >
        {text}
      </h1>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden"
    >
      {/* Fade-out en el borde derecho para suavizar el corte */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-neutral-900 to-transparent z-10" />

      <h1
        className={`
          text-4xl font-bold leading-tight text-white
          whitespace-nowrap
          ${isHovered ? "" : "marquee-track"}
        `}
        style={
          animationDelayPassed && !isHovered
            ? ({
                "--marquee-duration": `${Math.max(4, text.length * 0.35)}s`,
              } as React.CSSProperties)
            : {
                transform: "translateX(0)",
                transition: "transform 0.3s ease-out",
              }
        }
      >
        <span ref={textRef} className="inline-block pr-12">
          {text}
        </span>
        <span className="inline-block pr-12" aria-hidden>
          {text}
        </span>
      </h1>
    </div>
  );
};

export default CardMovieViewer;
