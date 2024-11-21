import { MongoClient } from 'mongodb';
import MovieListClient from "./MovieListClient";

function convertToPlainObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

async function getMovies() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("DB_MovieList");
    const movies = database.collection("movies");
    const cursor = await movies.find({});
    const result = await cursor.toArray();
    return result.map(convertToPlainObject);
  } finally {
    await client.close();
  }
}

export default async function MovieList() {
  let data = [];
  let error = null;

  try {
    data = await getMovies();
  } catch (e) {
    console.error("Error fetching movies:", e);
    error = e.message;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen lg:h-full py-4">
      <MovieListClient list={data} />
    </div>
  );
}