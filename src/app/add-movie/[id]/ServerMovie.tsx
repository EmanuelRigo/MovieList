import Image from "next/image";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
  genres: { id: number; name: string }[];
}

interface ServerMovieProps {
  id: string;
}

export async function ServerMovie({ id }: ServerMovieProps) {
  const API_KEY = process.env.API_KEY; // La clave de API permanece en el servidor
  const urlBase = "https://api.themoviedb.org/3/movie/";

  const response = await fetch(`${urlBase}${id}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie data");
  }

  const data: Movie = await response.json();

  return (
    <div className="h-screen w-screen flex items-center">
      <div className="container md:max-h-[956px] rounded-lg bg-neutral-300 dark:bg-neutral-950 mx-auto flex w-full h-full lg:h-5/6 overflow-auto">
        <div className="relative m-4 flex w-2/5 rounded-lg aspect-w-9 aspect-h-16">
          <Image
            src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "/images/poster.jpg"}
            alt={data.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
        <div className="text-black dark:text-white p-4 flex flex-col justify-between w-full">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl">{data.title}</h1>
              <Link
                href="/add-movie"
                className="p-4 bg-blue-500 dark:bg-orange-500 rounded-lg text-white"
              >
                Volver
              </Link>
            </div>
            <p className="mb-4">{data.release_date}</p>
            {data.genres &&
              data.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            <p>{data.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}