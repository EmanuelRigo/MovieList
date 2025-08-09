import Link from "next/link";
import { FooterMainMenu } from "@/components/menu/FooterMainMenu";

export default function NotFound() {
  return (
    <div className="h-svh w-screen flex flex-col overflow-hidden justify-center">
      <div className="w-full h-full 1-5xl:max-h-[956px] 1-5xl:h-5/6 lg:w-full 1-5xl:container rounded-xl bg-neutral-300 dark:lg:bg-neutral-900 dark:bg-transparent mx-auto grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[380px_400px_1fr] gap-4 p-4">
        <div className="flex flex-col justify-between">
          <FooterMainMenu />
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center h-full text-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
            404 - Página No Encontrada
          </h1>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
            Lo sentimos, la página que buscas no existe.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
