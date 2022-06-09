import React from "react";
import {
  BackgroundLetterAvatars,
  Footer,
  Navbar,
  FriendRequest,
} from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { currentUser, friends } from "../../reducers/mainSlice";
import { useNavigate } from 'react-router-dom'
import httpClient from '../../httpClient'

const ProfileSettingsPage = () => {
  const userInfo = useSelector(currentUser);
  const navigate = useNavigate();
  const allFriends = useSelector(friends);

  async function logoutUser() {

    try {
      const resp = await httpClient.post(
        "https://uabout.herokuapp.com/api/logout"
  
      );
  
      if (resp.status === 500) {
        return navigate('/')
      }
  
      if (resp.status === 200){
        return navigate('/')
      }
  
      return resp;
    } catch (e) {
      console.log(e);
    }
  }

  if (allFriends.length === 0) {
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
        <Footer />
      </div>
    );
  } else if (!Array.isArray(allFriends)) {
    const friendsArr = [
      ...allFriends["friends"].map((f) => ({ ...f, status: "Friend" })),
      ...allFriends["received_friend_requests"].map((f) => ({
        ...f,
        status: "Pending Friend Requests",
      })),
      ...allFriends["sent_friend_requests"].map((f) => ({
        ...f,
        status: "Sent Friend Requests",
      })),
    ];

    console.log(friendsArr);

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
                id="logoutIcon"
                icon={faRightFromBracket}
                size="5x"
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>
        <div className="friend-container">
          {friendsArr.map(
            (
              { first_name, last_name, username, status },
              idx
            ) => (
              <FriendRequest
                first_name={first_name}
                last_name={last_name}
                username={username}
                idx={idx}
                status={status}
              />
            )
          )}
        </div>
        <Footer />
      </div>
    );
  }
};

export default ProfileSettingsPage;
