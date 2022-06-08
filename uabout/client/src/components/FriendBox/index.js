import "./index.css";
import BackgroundLetterAvatars from "../AvatarIcon";
import { Button } from "@mui/material";

const FriendBox = ({ username, first_name, last_name, idx }) => {
  function sendFriendRequest() {
    console.log();
  }
  return (
    <>
      <div key={idx} className="friend_list">
        <div className="friend_card">
          <div class="Avatar">
            <BackgroundLetterAvatars />
          </div>
          <div class="NameBox">
            {first_name} {last_name}
          </div>
          <div class="UsernameBox">{username}</div>
          <Button variant="outlined" onClick={sendFriendRequest()}>
            Add Friend
          </Button>
        </div>
      </div>
    </>
  );
};

export default FriendBox;
