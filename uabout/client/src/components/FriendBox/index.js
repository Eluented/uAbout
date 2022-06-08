import "./index.css";
import BackgroundLetterAvatars from "../AvatarIcon";
import { Button } from "@mui/material";
import { friendRequest } from "../../actions";

const FriendBox = ({ username, first_name, last_name, user_id, idx }) => {

  function sendFriendRequest(user_id) {
    return friendRequest(user_id)
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
          <Button variant="outlined" onClick={sendFriendRequest(user_id)}>
            Add Friend
          </Button>
        </div>
      </div>
    </>
  );
};

export default FriendBox;
