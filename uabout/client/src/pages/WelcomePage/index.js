import styled from "styled-components";
import { AccountBox } from "../../components";
import logo from "./pics/UAbout2.png";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserPlus,
  faAnglesRight,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const WelcomePage = () => {
  return (
    <>
      <div class="ParentContainer">
        <div class="WelcomeContainer">
          <img src={logo} style={{ marginBottom: "-1.5%" }} width="60%" />
          <br></br>
          <ul style={{ "list-style-type": "none" }}>
            
            <li>
              <FontAwesomeIcon icon={faAnglesRight} size="1x" />     Sick of organising social events with your friends?
            </li>
            <br></br>
            <li>
              <FontAwesomeIcon icon={faAnglesRight} size="1x" />     Messaging every single person individually across dozens of communication platforms?
            </li>
          </ul>
          <h3
            style={{
              fontWeight: "normal",
              marginBottom: "-1%",
              marginTop: "0",
              textDecoration: "underline",
            }}
          >
            Get them all in one place
          </h3>
          <p style={{ marginBottom: "-1%" }}>
            <FontAwesomeIcon icon={faSearch} size="2x" /> Search for your
            friends, or send friend requests to other users
          </p>
          <p style={{ marginBottom: "-1%" }}>
            <FontAwesomeIcon icon={faUserPlus} size="2x" /> Post an event and
            invite all your uAbout friends...(or just the ones you{" "}
            <em>really</em> like!)
          </p>
          <p style={{ marginBottom: "-1%" }}>
            <FontAwesomeIcon icon={faCalendarDays} size="2x" /> Keep up to date
            with your social calendar &amp; enjoy making plans again!
          </p>
        </div>
        <div class="FormContainer">
          <AccountBox />
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
