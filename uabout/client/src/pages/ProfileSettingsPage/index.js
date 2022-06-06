import React from "react";
import { BackgroundLetterAvatars, Footer, Navbar } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const ProfileSettingsPage = () => {
  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-section">
        <div className="eventform-parent-container" id="profile-card">
          <h1>Profile Settings</h1>
          <BackgroundLetterAvatars />
        </div>
        <FontAwesomeIcon icon={faRightFromBracket} size="5x"></FontAwesomeIcon>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSettingsPage;
