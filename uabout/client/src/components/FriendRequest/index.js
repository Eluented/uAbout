import React from "react";
import httpClient from "../../httpClient";
import './index.css'
import BackgroundLetterAvatars from "../AvatarIcon";
import { Button } from "@mui/material";

function FriendRequest({ first_name, last_name, user_id, username, status, idx }) {

  async function acceptFriendRequest() {
    try {
      const resp = await httpClient.post(
        "https://uabout.herokuapp.com/api/accept-friend",
        {user_b_id: user_id}
      );

      return resp;
    } catch (e) {
      console.log(e);
    }
  }

  if (status === "Friend"){
    return (
      <>
      <div key={idx} className="request_list">
        <div className="request_card">
          <div class="Avatar">
            <BackgroundLetterAvatars 
            first_name={first_name}
            last_name={last_name}/>
          </div>
          <div class="RequestName">
            {first_name} {last_name}
          </div>
          <div class="UsernameRequest">{username} </div>
        </div>
      </div>
    </>
    )
  }
  if (status === "Pending Friend Requests"){
    return (
      <>
      <div key={idx} className="request_list">
        <div className="request_card">
          <div class="Avatar">
            <BackgroundLetterAvatars 
            first_name={first_name}
            last_name={last_name}/>
          </div>
          <div class="RequestName">
            {first_name} {last_name}
          </div>
          <div class="UsernameRequest">{username} </div>
          <div class="AcceptButton">
            <Button variant="outlined" onClick={acceptFriendRequest}>
              Accept
            </Button>
          </div>
          <div class="DeclineButton">
            <Button variant="outlined">
              Decline
            </Button>
          </div>
        </div>
      </div>
    </>
    )
  }
  if (status === "Sent Friend Requests"){
    return (
      <>
      <div key={idx} className="request_list">
        <div className="request_card">
          <div class="Avatar">
            <BackgroundLetterAvatars 
            first_name={first_name}
            last_name={last_name}/>
          </div>
          <div class="RequestName">
            {first_name} {last_name}
          </div>
          <div class="UsernameRequest">{username} </div>
        </div>
      </div>
    </>
    )
  }
}

export default FriendRequest;
