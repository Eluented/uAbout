import React from "react";

import { Footer, Navbar } from "../../components";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Navbar />
      <div className="homepage-section">
        <div className="calendar-parent-container"></div>
        <div className="events-parent-container"></div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
