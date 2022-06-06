import React from "react";

import { Footer, Navbar, EventForm } from "../../components";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Navbar />
      <div className="homepage-section">
        <div className="postform-parent-container">
          <EventForm />
        </div>
        <div className="postrender-container"></div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
