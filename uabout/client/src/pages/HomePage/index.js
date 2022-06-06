import React from "react";

import { Footer, Navbar, EventForm, EventCard } from "../../components";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Navbar />
      <div className="homepage-section">
        <div className="eventform-parent-container">
          <EventForm />
        </div>
        <div className="eventrender-container">
          <EventCard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
