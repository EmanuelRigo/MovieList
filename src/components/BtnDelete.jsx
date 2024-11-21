"use client";

import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const uri = "/api/movie";

const mySwal = withReactContent(Swal);
const BtnDelete = ({ id }) => {
  const router = useRouter();
  const deleteDocument = () => {
    mySwal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(`${uri}/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            router.refresh();
          }
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
  };

  return (
    <button onClick={deleteDocument} className="p-4 bg-red-700 font-bold m-2">
      Delete
    </button>
  );
};

export default BtnDelete;
