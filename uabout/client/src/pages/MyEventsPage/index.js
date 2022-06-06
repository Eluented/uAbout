import React from "react";
import { Navbar, Footer, ReactCalendar } from "../../components";

const MyEventsPage = () => {
  return (
    <div className="myevents-container">
      <Navbar />
      <div className="homepage-section">
        <div className="calendar-parent-container">
          <ReactCalendar />
        </div>
        <div className="events-parent-container"></div>
      </div>
      <Footer />
    </div>
  );
};

export default MyEventsPage;
