import React from "react";
import httpClient from "../../httpClient";

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
      <span key={idx} >
      <p>{first_name} {last_name} {username} </p>
      <p>{status}</p>
      <button onClick={acceptFriendRequest}>Accept</button>
      <button>Decline</button>
    </span>
    )
  }
  if (status === "Pending Friend Requests"){
    return (
      <span key={idx} >
      <p>{first_name} {last_name} {username} </p>
      <p>{status}</p>
      <button onClick={acceptFriendRequest}>Accept</button>
      <button>Decline</button>
    </span>
    )
  }
  if (status === "Sent Friend Requests"){
    return (
      <span key={idx} >
      <p>{first_name} {last_name} {username}</p>
      <p>{status}</p>
      <button onClick={acceptFriendRequest}>Accept</button>
      <button>Decline</button>
    </span>
    )
  }
}

export default FriendRequest;
