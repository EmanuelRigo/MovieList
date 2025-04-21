import { useRouter } from "next/navigation";
import { MovieDB } from "@/context/interfaces/movieTypes";
import Swal from "sweetalert2";
import {
  deleteMovieById,
  getMovieByIdUpdate,
} from "@/components/widgets/movies.api";
import { useMovieContext } from "@/context/MovieContext";
import { FaTrash } from "react-icons/fa";

interface EditButtonsProps {
  id: string;
  movie: MovieDB;
}

const EditButtons: React.FC<EditButtonsProps> = ({ id, movie }) => {
  const router = useRouter();
  const { setMovie } = useMovieContext();

  const checkFormats = async () => {
    if (movie) {
      const { vhs, dvd, bluray } = movie.formats;
      if (vhs || dvd || bluray) {
        Swal.fire({
          icon: "info",
          title: "Heads up!",
          text: "At least one format (VHS, DVD, or Blu-ray) is available.",
        }).then(() => {
          onSubmitEdit(movie);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Format required",
          text: "The movie must have at least one format.",
        });
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
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onSubmitDelete();
        Swal.fire("Deleted!", "The movie has been deleted.", "success");
        setMovie(null); // Clear the selected movie from context
      }
    });
  };

  const onSubmitEdit = async (movie: MovieDB) => {
    const { formats } = movie;
    try {
      const response = await getMovieByIdUpdate(id, { formats });
      if (!response) {
        throw new Error("Failed to update.");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="flex">
      <button
        onClick={checkFormats}
        className="p-3 md:p-5 bg-blue-500 dark:bg-orange-500 rounded-md md:rounded-lg w-full text-black dark:text-white me-2 md:me-4"
      >
        Finish
      </button>
      <button
        onClick={handleDelete}
        className="p-3 md:p-5 bg-red-500 dark:bg-red-700 rounded-md md:rounded-lg w-1/6 text-black dark:text-white flex items-center justify-center"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default EditButtons;
