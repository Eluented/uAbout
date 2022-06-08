import React from "react";

function FriendRequest({ email, first_name, phone_number, user_id, username, idx }) {

  return (
    <span key={idx}>
      <p>{email} {first_name} {phone_number} {username} sent you a friend request</p>
      <button>Accept</button>
      <button>Decline</button>
    </span>
  );
}

export default FriendRequest;
