import React from "react";
import httpClient from "../../httpClient";

function FriendRequest({ email, first_name, phone_number, user_id, username, status, idx }) {

  async function acceptFriendRequest() {
    try {
      const resp = await httpClient.post(
        "https://uabout.herokuapp.com/api/accept-friend",
        {user_b_id: user_id}
      );
      console.log(resp)
      return resp;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <span key={idx} >
      <p>{email} {first_name} {phone_number} {username} sent you a friend request</p>
      <p>{status}</p>
      <button onClick={acceptFriendRequest}>Accept</button>
      <button>Decline</button>
    </span>
  );
}

export default FriendRequest;
