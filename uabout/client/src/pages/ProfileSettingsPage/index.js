import React from "react";
import { BackgroundLetterAvatars, Footer, Navbar } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../../actions";
import { useSelector } from "react-redux";
import { currentUser } from "../../reducers/mainSlice";

const ProfileSettingsPage = () => {
  const userInfo = useSelector(currentUser);

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-section">
        <div className="eventform-parent-container" id="profile-card">
          <h1>Profile Settings</h1>
          <div id="avatar-container">
            <BackgroundLetterAvatars />
            <ul id="profile-details">
              <li>Username: {userInfo.username}</li>
              <li>First Name: {userInfo.first_name}</li>
              <li>Last Name: {userInfo.last_name}</li>
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
        <div className="all-friends">
          <h2>Friends</h2>
          <hr />
        </div>
        <div className="friend requests">
          <h2>Friend Requests</h2>
          <hr />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSettingsPage;
