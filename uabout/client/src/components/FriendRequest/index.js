import React from "react";

function FriendRequest() {
  function handleFriendRequest() {
    console.log();
  }

  return (
    <span>
      <p>username sent you a friend request</p>
      <button>Accept</button>
      <button>Decline</button>
    </span>
  );
}

export default FriendRequest;
