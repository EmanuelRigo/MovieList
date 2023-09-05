import React, { useState } from "react";

import Menu from "./Menu";
import List from "./List";

function Main() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "?api_key=2f1736eb88ab6c6643da070a6a190ac9";
  const image_path = "https://image.tmdb.org/t/p/original";
  const url_image = "https://image.tmdb.org/t/p/original";

  //variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState("");
  const [movie, setMovie] = useState({ title: "loading movie" });
  const [playing, setPlaying] = useState(false);

  return (
    <div className="main">
      <List></List>
    </div>
  );
}

export default Main;
