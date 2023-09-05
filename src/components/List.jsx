import React from "react";
import Carousel from "./Carrousel";
import "../stylesheets/List.css";

function List({ movies }) {
  console.log(movies);
  return (
    <div className="gallery__container">
      <div className="gallery">
        <Carousel movies={movies}></Carousel>
      </div>
    </div>
  );
}

export default List;
