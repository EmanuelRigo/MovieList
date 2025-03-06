"use client";

import MovieList from "@/components/list/MovieList";
import { useEffect, useState } from "react";
import { FooterMainMenu } from "@/components/menu/FooterMainMenu";
import CardMovieViewer from "@/components/movie-viewer/CardMovieViewer";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  console.log("holaaa apps");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 1023);
    };

    handleResize(); // Verifica el tamaño inicial
    window.addEventListener("resize", handleResize); // Escucha cambios de tamaño

    return () => {
      window.removeEventListener("resize", handleResize); // Limpia el listener
    };
  }, []);

  return (
    <div className="h-screen w-screen flex items-center">
      <div
        className="container md:max-h-[956px] rounded-xl bg-neutral-300 dark:bg-neutral-900 mx-auto grid grid-cols-1  gap-3 h-full lg:h-5/6 overflow-auto md-grid-template"
      >
        <div className="h-full w-full flex flex-col justify-between p-4 mb-8 lg:mb-auto">
          <FooterMainMenu />
        </div>
        {isMobile && (
          <div className="block h-full">
            <MovieList />
          </div>
        )}
        {isMobile && (
          <div className="h-full p-4">
            <CardMovieViewer />
          </div>
        )}
      </div>
    </div>
  );
}