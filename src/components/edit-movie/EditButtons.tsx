import { useRouter } from "next/navigation";
import { Movie } from "@/context/interfaces/movieTypes";

const uri = "http://localhost:3000/api/movie";

interface EditButtonsProps {
  id: string;
  movie: Movie;
}

const EditButtons: React.FC<EditButtonsProps> = ({ id, movie }) => {
  const router = useRouter();
  console.log("+++++++++++", movie);

  const checkFormats = async () => {
    if (movie) {
      const { vhs, dvd, bluray } = movie.formats;
      if (vhs || dvd || bluray) {
        alert(
          "¡Atención! Alguno de los formatos (VHS, DVD o Blu-ray) está disponible."
        );
        onSubmitEdit(movie);
      } else {
        alert("todo bien");
      }
    }
  };

  const onSubmitDelete = async () => {
    const response = await fetch(`${uri}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.refresh();
      router.push("/");
    }
  };

  const onSubmitEdit = async (movie: Movie) => {
    const { formats } = movie;
    try {
      console.log("++++++", id);
      const response = await fetch(`${uri}/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formats }),
      });
      if (!response.ok) {
        throw new Error("Failed to update.");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error, "hola error");
    }
  };

  return (
    <div className="flex">
      <button
        onClick={checkFormats}
        className="p-5 bg-blue-500 dark:bg-orange-500 rounded-lg w-full text-black dark:text-white me-4"
      >
        Terminar
      </button>
      <button
        onClick={onSubmitDelete}
        className="p-5 bg-red-500 dark:bg-red-700 rounded-lg w-1/6 text-black dark:text-white"
      >
        Eliminar
      </button>
    </div>
  );
};

export default EditButtons;