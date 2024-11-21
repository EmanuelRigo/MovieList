import { useRouter } from "next/navigation";

const uri = "/api/movie";

const EditButtons = ({ id, movie }) => {
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

  const onSubmitEdit = async (movie) => {
    const { formats } = movie;
    try {
      console.log("++++++", id);
      const responose = await fetch(`${uri}/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formats }),
      });
      if (!responose.ok) {
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
        className="p-5 bg-orange-500 rounded-lg w-full text-black me-4"
      >
        Terminar
      </button>
      <button
        onClick={onSubmitDelete}
        className="p-5 bg-red-500 rounded-lg w-full text-black"
      >
        Eliminar
      </button>
    </div>
  );
};

export default EditButtons;
