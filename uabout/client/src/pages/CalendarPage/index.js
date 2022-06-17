import React from "react";
import { Footer, ReactCalendar } from "../../components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendar,
  faEnvelope,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const CalendarPage = () => {
  const navigate = useNavigate();


  return (
    <>
      <div className="homepage-container">

        <nav className="Navbar-Calender">
          <ul className="nav-flex">
            <li>
              <div class="tooltip">
                <span class="tooltiptext">Calendar</span>
                <FontAwesomeIcon
                  icon={faCalendar}
                  size="3x"
                  onClick={() => navigate("/calendar")}
                ></FontAwesomeIcon>
              </div>
            </li>
            <li>
              <div class="tooltip">
                <span class="tooltiptext">Home Page</span>
                <FontAwesomeIcon
                  icon={faHome}
                  size="3x"
                  onClick={() => navigate("/home")}
                ></FontAwesomeIcon>
              </div>
            </li>
            <li>
              <div class="tooltip">
                <span class="tooltiptext">User Search</span>
                <FontAwesomeIcon
                  icon={faSearch}
                  size="3x"
                  onClick={() => navigate("/search")}
                ></FontAwesomeIcon>
              </div>
            </li>
            <li>
              <div class="tooltip">
                <span class="tooltiptext">Messages</span>
                <FontAwesomeIcon icon={faEnvelope} size="3x"></FontAwesomeIcon>
              </div>
            </li>
          </ul>
        </nav>

        <ReactCalendar />

      </div>

    </>
  )
};

export default CalendarPage;