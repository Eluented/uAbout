import React from "react";
import { Footer, Navbar, EventCard, ReactCalendar } from "../../components";
import { postsResult } from "../../reducers/mainSlice";
import { useSelector } from "react-redux";
import { Eventcalendar } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

const CalendarPage = () => {
  const searchPostStatus = useSelector((state) => state.main.status);

  const getPosts = useSelector(postsResult);

  if (searchPostStatus === "loading") {
    return <h1>Loading ...</h1>;
  }

  if (searchPostStatus === "failed") {
    return <h1>Failed to display posts! Please try again</h1>;
  }

  if (searchPostStatus === "succeeded") {
    return (
      <>
        {" "}
        {!getPosts.length ? (
          <div className="myevents-container">
            <Navbar />
            <div className="homepage-section">
              <div className="calendar-parent-container">
                <ReactCalendar />
                <div id="my-events-container">
                  <h1 className="events-heading">My Events</h1>
                  <div className="calendarpage-event-container">
                    <h1>You have no current events!</h1>
                  </div>
                </div>
              </div>
              <div className="events-parent-container"></div>
            </div>
            <Footer />
          </div>
        ) : (
          <div className="myevents-container">
            <Navbar />
            <div className="homepage-section">
              <div className="calendar-parent-container">
                <Eventcalendar
                  data={[{
                    start: new Date(),
                    title: 'Today\'s event'
                  }, {
                    start: new Date(2020, 11, 18, 9, 0),
                    end: new Date(2020, 11, 20, 13, 0),
                    title: 'Multi day event'
                  }]}
                />
              </div>
              <div className="events-parent-container"></div>
            </div>
            <Footer />
          </div>
        )}
      </>
    );
  }
};

export default CalendarPage;
