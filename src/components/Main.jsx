import React, { useEffect, useState } from "react";

import Menu from "./Menu";
import List from "./List";

function Main() {
  const [load, setLoad] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const pedido = fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=2f1736eb88ab6c6643da070a6a190ac9&languaje=es-MX&page=3"
    )
      .then((respuesta) => {
        const peliculas = respuesta.json();
        return peliculas;
      })
      .then((peliculas) => {
        setMovies(peliculas.results);
        setLoad(true);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="main">
      {load ? "prooductos cargados" : "cargando"}
      <List movies={movies}></List>
    </div>
  );
}

export default Main;
