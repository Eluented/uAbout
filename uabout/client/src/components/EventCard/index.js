import React from "react";

const EventCard = () => {
  return (
    <div className="e-outer-container">
      <div className="e-inner-container">
        <h3>Event title</h3>
        <div className="date-box">
          <span>Start Date: </span>
          <span>End Date: </span>
        </div>
        <p>Event Details</p>
        <button type="submit">To go or not to go?</button>
      </div>
    </div>
  );
};

export default EventCard;
