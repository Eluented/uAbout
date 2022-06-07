import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendar,
  faComments,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <FontAwesomeIcon
            icon={faCalendar}
            size="3x"
            onClick={() => navigate("/myevents")}
          ></FontAwesomeIcon>
        </li>
        <li>
          <FontAwesomeIcon
            icon={faHome}
            size="3x"
            onClick={() => navigate("/home")}
          ></FontAwesomeIcon>
        </li>
        <li>
          <FontAwesomeIcon
            icon={faSearch}
            size="3x"
            onClick={() => navigate("/search")}
          ></FontAwesomeIcon>
        </li>
        <li>
          <FontAwesomeIcon icon={faComments} size="3x"></FontAwesomeIcon>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
