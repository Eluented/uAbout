import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendar,
  faComments,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <FontAwesomeIcon icon={faCalendar} size="3x"></FontAwesomeIcon>
        </li>
        <li>
          <FontAwesomeIcon icon={faHome} size="3x"></FontAwesomeIcon>
        </li>
        <li>
          <FontAwesomeIcon icon={faSearch} size="3x"></FontAwesomeIcon>
        </li>
        <li>
          <FontAwesomeIcon icon={faComments} size="3x"></FontAwesomeIcon>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
