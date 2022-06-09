import React from "react";
import { Footer, Navbar, EventCard, ReactCalendar } from "../../components";
import { postsResult } from "../../reducers/mainSlice";
import { useSelector } from "react-redux";

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
                <div id="my-event-container">
                  <h1>My Events</h1>
                  <div className="eventrender-container">
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
                <ReactCalendar />
                <div className="my-events-container">
                  <h1>My Events</h1>
                  <div className="eventrender-container">
                    {searchPostStatus === "succeeded" &&
                      getPosts.map(
                        (
                          {
                            post_body,
                            post_title,
                            post_id,
                            event_start,
                            event_end,
                          },
                          idx
                        ) => (
                          <EventCard
                            className="event-cards"
                            post_body={post_body}
                            post_title={post_title}
                            post_id={post_id}
                            event_start={event_start}
                            event_end={event_end}
                            key={idx}
                          />
                        )
                      )}
                  </div>
                </div>
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
