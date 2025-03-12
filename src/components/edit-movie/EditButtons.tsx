import { useRouter } from "next/navigation";
import { Movie } from "@/context/interfaces/movieTypes";
import Swal from "sweetalert2";
import { deleteMovieById, getMovieByIdUpdate } from "@/components/widgets/movies.api";
import { movieContext } from "@/context/MovieContext";
import { useContext } from "react";
import { FaTrash } from "react-icons/fa"; // Importa el icono de tacho de basura

const uri = "http://localhost:3000/api/movie";

interface EditButtonsProps {
  id: string;
  movie: Movie;
}

const EditButtons: React.FC<EditButtonsProps> = ({ id, movie }) => {
  const router = useRouter();
  const { setMovie } = useContext(movieContext);

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
        alert("almenos tiene que tener un formato");
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
        setMovie(null);
      }
    });
  };

  const onSubmitEdit = async (movie: Movie) => {
    const { formats } = movie;
    try {
      console.log("++++++", id);
      const response = await getMovieByIdUpdate(id, { formats });
      console.log(id, formats)
      if (!response) {
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
        className="p-3 md:p-5 bg-blue-500 dark:bg-orange-500 rounded-md md:rounded-lg w-full text-black dark:text-white me-2 md:me-4"
      >
        Terminar
      </button>
      <button
        onClick={handleDelete}
        className="p-3 md:p-5 bg-red-500 dark:bg-red-700 rounded-md md:rounded-lg w-1/6 text-black dark:text-white flex items-center justify-center"
      >
        <FaTrash /> {/* Icono de tacho de basura */}
      </button>
    </div>
  );
};

export default EditButtons;