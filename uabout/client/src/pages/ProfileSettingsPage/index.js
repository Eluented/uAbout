import React from "react";
import { BackgroundLetterAvatars, Footer, Navbar, FriendRequest } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { currentUser, friends } from "../../reducers/mainSlice";

const ProfileSettingsPage = () => {
  const userInfo = useSelector(currentUser);

  const allFriends = useSelector(friends);

  const currentFriends = [...allFriends["friends"].map(f => ({...f, status:"Friend"})) ]

  const recievedRequests = [...allFriends["received_friend_requests"].map(f => ({...f, status:"Pending Friend Requests"}))]

  const sent_friend_request = [...allFriends["sent_friend_requests"].map(f => ({...f, status:"Sent Friend Requests"}))]

  console.log(currentFriends, recievedRequests, sent_friend_request)
  
  if (allFriends === []){
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
    )
  } else {
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
            {!allFriends.length ? <h1>You have no requests</h1>
            :
            allFriends.map(({ email, first_name, phone_number, user_id, username }, idx) => (
            < FriendRequest
              email={email}
              first_name={first_name}
              phone_number={phone_number}
              user_id={user_id}
              username={username}
              idx={idx}
            />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default ProfileSettingsPage;
