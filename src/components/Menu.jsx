import "../stylesheets/Menu.css";
import React from "react";
import {
  MdListAlt,
  MdOutlineAddCircleOutline,
  MdOutlineQuestionMark,
} from "react-icons/md";
import { GiCardRandom } from "react-icons/gi";

function Menu() {
  return (
    <div className="menu">
      <div className="menu__grid-container">
        <div className="caja">
          <MdListAlt></MdListAlt>
        </div>
        <div className="caja">
          <GiCardRandom></GiCardRandom>
        </div>
        <div className="caja">
          <MdOutlineAddCircleOutline></MdOutlineAddCircleOutline>
        </div>
        <div className="caja">
          <MdOutlineQuestionMark></MdOutlineQuestionMark>
        </div>
        <div className="caja"></div>
        <div className="caja"></div>
      </div>
    </div>
  );
}

export default Menu;
