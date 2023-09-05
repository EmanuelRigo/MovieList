import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../stylesheets/styles.css";
import { Pagination } from "swiper/modules";

import "../stylesheets/Carrousel.css";

function Carousel({ movies }) {
  return (
    <>
      <div className="carousel-container">
        <div className="carousel">
          <h1>titulo</h1>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            modules={[Pagination]}
            className="mySwiper"
          >
            {movies.map((movie) => {
              return (
                <SwiperSlide>
                  <h1>{movie.title} </h1>
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                    }
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Carousel;
