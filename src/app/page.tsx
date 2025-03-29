"use client";

import MovieList from "@/components/list/MovieList";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FooterMainMenu } from "@/components/menu/FooterMainMenu";
import CardMovieViewer from "@/components/movie-viewer/CardMovieViewer";

import { checkOnlineStatus } from "@/components/widgets/users.api";


console.log("procceess:::", process.argv)

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  const router = useRouter();

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

  useEffect(() => {
    const fetchOnlineStatus = async () => {
      try {
        const response = await checkOnlineStatus();
        if (response.status !== 200) {
          router.push("/login"); // Redirige a la página de inicio de sesión si el usuario está offline
        } else {
          setIsLoading(false); // Establece isLoading en false si el usuario está online
        }
      } catch (error) {
        console.error("Error checking online status:", error);
        router.push("/login"); // Redirige a la página de inicio de sesión en caso de error
      }
    };

    fetchOnlineStatus();
  }, [router]);

  if (isLoading) {
    return null; // No renderiza nada mientras isLoading es true
  }

  return (
    <div className="h-screen w-screen flex items-center">
      <div
        className="container md:max-h-[956px] rounded-xl bg-neutral-300 dark:lg:bg-neutral-900 dark:bg-transparent  mx-auto grid grid-cols-1 h-full 2xl:h-5/6 overflow-auto md-grid-template gap-4 p-4"
      >
        <div className="h-full w-full flex flex-col justify-between mb-8 lg:mb-auto">
          <FooterMainMenu />
        </div>
        {isMobile && (
          <div className="block h-full">
            <MovieList />
          </div>
        )}
        {isMobile && (
          <div className="h-full">
            <CardMovieViewer />
          </div>
        )}
      </div>
    </div>
  );
}