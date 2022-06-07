import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLetterAvatars from "../AvatarIcon";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../reducers/mainSlice";

const Footer = () => {
  const navigate = useNavigate();

  const userInfo = useSelector(currentUser);

  return (
    <div className="footer-container">
      <footer className="Footer">
        <h2>uAbout?</h2>
        <div className="triangle">
          <h3 className="username">Hello {userInfo.first_name}</h3>
          <button className="avatar-icon" onClick={() => navigate("/profile")}>
            <BackgroundLetterAvatars />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
