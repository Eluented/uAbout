import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLetterAvatars from "../AvatarIcon";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer-container">
      <footer className="Footer">
        <h2>uAbout?</h2>
        <div className="triangle">
          <h3 className="username">Hello David!</h3>
          <button className="avatar-icon" onClick={() => navigate("/profile")}>
            <BackgroundLetterAvatars />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
