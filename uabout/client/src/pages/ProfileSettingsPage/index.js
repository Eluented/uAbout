import React from "react";
import { BackgroundLetterAvatars, Footer, Navbar } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../../actions";

const ProfileSettingsPage = () => {
  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-section">
        <div className="eventform-parent-container" id="profile-card">
          <h1>Profile Settings</h1>
          <div id="avatar-container">
            <BackgroundLetterAvatars />
            <ul id="profile-details">
              <li>Username: </li>
              <li>First Name: </li>
              <li>Last Name: </li>
            </ul>
          </div>
        </div>
        <div className="bottom-section">
          <button id="logout-btn" onClick={logoutUser}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size="5x"
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <div className="friend-container">
        <div className="all-friends"></div>
        <div className="friend requests"></div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSettingsPage;
