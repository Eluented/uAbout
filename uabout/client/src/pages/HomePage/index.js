import React, { useState, useEffect } from "react";

import { Footer, Navbar, EventForm, EventCard } from "../../components";
import { renderPosts, postsResult } from "../../reducers/mainSlice";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderPosts())
  }, [])

  // getting stuff from redux
  const searchPostStatus = useSelector(state => state.main.status);


  const getPosts = useSelector(postsResult)


  return (
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
            Create an event David!
          </button>
          {modalOpen && <EventForm setOpenModal={setModalOpen} />}
        </div>
        <div className="eventrender-container">

          {searchPostStatus === "succeeded" &&
            getPosts.map(({ post_body, post_title, post_id, event_start, event_end }, idx) => (
              <EventCard className="event-cards"
                post_body={post_body}
                post_title={post_title}
                post_id={post_id}
                event_start={event_start}
                event_end={event_end}
                key={idx} />
            ))}

          {searchPostStatus === "failed" &&
            <h1>There are no posts to display</h1>}
        </div>
        : <h1>...</h1>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
