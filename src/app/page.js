"use client";

import { useEffect, useState } from "react";
import { FooterMainMenu } from "@/components/menu/FooterMainMenu";
import MovieList from "@/components/list/MovieList";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 768);
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
        className="container rounded-xl bg-neutral-100 dark:bg-neutral-900 mx-auto grid lg:grid-cols-3 gap-3 h-full lg:h-5/6 overflow-auto"
        style={{ gridTemplateColumns: "1fr 1fr 25rem" }}
      >
        <div className="h-full flex flex-col justify-between p-4 mb-8 lg:mb-auto">
          <FooterMainMenu />
        </div>
        {isMobile && (
          <div className="block h-full">
            <MovieList></MovieList>
            Movielist
          </div>
        )}
        {isMobile && (
          <div className="h-full">
            {/* <CardMovieViewer></CardMovieViewer> */}
            cardmovieviewer
          </div>
        )}
      </div>
    </div>
  );
}
