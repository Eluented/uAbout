import "./index.css";
import BackgroundLetterAvatars from "../AvatarIcon";
import { Button } from "@mui/material";
import httpClient from "../../httpClient";

const FriendBox = ({ username, first_name, last_name, user_id, idx }) => {
  const user = {
    user_b_id: user_id
  }
 
  async function friendRequest() {
    try {
      const resp = await httpClient.post(
        "https://uabout.herokuapp.com/api/add-friend", 
        user
      );

      console.log(resp)
      return resp;
    } catch (e) {
      console.log(e);
    }
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
          <Button variant="outlined" onClick={friendRequest}>
            Add Friend
          </Button>
        </div>
      </div>
    </>
  );
};

export default FriendBox;
