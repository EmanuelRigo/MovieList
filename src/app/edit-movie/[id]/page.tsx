import { getMovieUser } from "@/components/widgets/movies.api";
import { cookies } from "next/headers";
import EditMovieCard from "@/components/edit-movie/EditMovieCard";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const nextCookies = await cookies();
  const cookieHeader = nextCookies.get("token")?.value;

  const headers: Record<string, string> = {};
  if (cookieHeader) {
    headers["Cookie"] = `token=${cookieHeader}`;
  }

  const movie = await getMovieUser(id, { headers });
  console.log("🚀 ~ Page ~ movie:", movie);

  return (
    <div className="h-[calc(100vh-56px)] lg:h-screen overflow-auto w-screen flex items-center">
      <EditMovieCard movieData={movie.response}></EditMovieCard>
    </div>
  );
};

export default Page;
