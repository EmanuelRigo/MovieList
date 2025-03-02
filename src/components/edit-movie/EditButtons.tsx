import { useRouter } from "next/navigation";
import { Movie } from "@/context/interfaces/movieTypes";
import Swal from "sweetalert2";
import { deleteMovieById } from "@/components/widgets/movies.api";

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
    try {
      await deleteMovieById(id);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, bórralo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onSubmitDelete();
        Swal.fire("¡Borrado!", "La película ha sido borrada.", "success");
      }
    });
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
        onClick={handleDelete}
        className="p-5 bg-red-500 dark:bg-red-700 rounded-lg w-1/6 text-black dark:text-white"
      >
        Eliminar
      </button>
    </div>
  );
};

export default EditButtons;