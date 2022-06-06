import React from "react";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <img
            src="../../images/icons8-calendar-50.png"
            className="calendar-icon"
            alt="calendar-icon"
          />
        </li>
        <li>
          <img
            src="../../images/icons8-home-50.png"
            className="home-icon"
            alt="home-icon"
          />
        </li>
        <li>
          <img
            src="../../images/icons8-search-50.png"
            className="search-icon"
            alt="search-icon"
          />
        </li>
        <li>
          <img
            src="../../images/icons8-chat-60.png"
            className="chat-icon"
            alt="chat-icon"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
