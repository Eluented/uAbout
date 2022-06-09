import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLetterAvatars from "../AvatarIcon";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../reducers/mainSlice";

const Footer = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(currentUser);

  const letterOne = userInfo.first_name;
  const letterTwo = userInfo.last_name;


  return (
    <div className="footer-container">
      <footer className="Footer">
        <h2>uAbout?</h2>
        <div className="triangle">
          <h3 className="username">Hello {userInfo.first_name}</h3>
          <button className="avatar-icon" onClick={() => navigate("/profile")}>
            <BackgroundLetterAvatars 
            first_name={letterOne}
            last_name={letterOne}
            />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
