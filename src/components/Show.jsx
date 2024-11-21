import React from "react";
import Link from "next/link";
import BtnDelete from "./BtnDelete";

const getData = async () => {
  try {
    const responose = await fetch(process.env.URI, { cache: "no-store" });
    return responose.json();
  } catch (error) {
    console.log("error:", error);
  }
};

const Show = async () => {
  const { data } = await getData();
  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((element) => (
        <div className="p-3 bg-red-500 my-4">
          <div>
            <h2 className="font-bold text-2xl text-slate-700">
              {element.title}
            </h2>
            <p>{element._id}</p>
          </div>
          {/* botones de acciones */}
          <div className="flex mt-4 space-x-3 md:mt-6">
            <Link
              href={`/edit/${element._id}`}
              className="text-blue-800 font-bold"
            >
              Edit
            </Link>
            <BtnDelete id={element._id}></BtnDelete>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Show;
