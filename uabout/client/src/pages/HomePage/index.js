import React, { useState } from "react";

import { Footer, Navbar, EventForm, EventCard } from "../../components";
import { postsResult, currentUser } from "../../reducers/mainSlice";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // getting stuff from redux
  const searchPostStatus = useSelector((state) => state.main.status);
  const userInfo = useSelector(currentUser);

  const posts = useSelector(postsResult);
  const getPosts = posts.slice().sort((a, b) => b - a)
  if (searchPostStatus === "loading") {
    return <h1>Loading ...</h1>;
  }

  if (searchPostStatus === "failed") {
    return <h1>Failed to display posts! Please try again</h1>;
  }

  if (searchPostStatus === "succeeded") {
    return (
      <>
        {!getPosts.length ? (
          <div className="homepage-container">
            <Navbar />
            <div className="homepage-section">
              <div className="eventform-parent-container">
                <button
                  className="openModalBtn"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Create an event {userInfo.username}!
                </button>
                {modalOpen && <EventForm setOpenModal={setModalOpen} />}
              </div>
              <div className="eventrender-container">
                <h1>There are no current events...</h1>
              </div>
            </div>
            <Footer />
          </div>
        ) : (
          <div className="homepage-container">
            <Navbar />
            <div className="homepage-section">
              <div className="eventform-parent-container">
                <button
                  className="openModalBtn"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Create an event {userInfo.first_name}!
                </button>
                {modalOpen && <EventForm setOpenModal={setModalOpen} />}
              </div>
              {modalOpen ? <></>
              :
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
                        first_name,
                        last_name,
                        phone_number
                      },
                      idx
                    ) => (
                      <EventCard
                        className="event-cards"
                        first_name={first_name}
                        last_name={last_name}
                        post_body={post_body}
                        post_title={post_title}
                        post_id={post_id}
                        event_start={event_start}
                        event_end={event_end}
                        key={idx}
                        phone_number={phone_number}
                      />
                    )
                  )}
              </div>
              }
            </div>
            <Footer />
          </div>
        )}
      </>
    );
  }
};

export default HomePage;
