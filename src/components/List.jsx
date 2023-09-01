import React from "react";
import Carousel from "./Carrousel";
import "../stylesheets/List.css";

function List() {
  return (
    <div className="gallery__container">
      <div className="gallery">
        <Carousel></Carousel>
      </div>
    </div>
  );
}

export default List;
