import React, { useState, useEffect } from "react";

import { Footer, Navbar, EventForm, EventCard } from "../../components";
import { renderPosts } from "../../reducers/mainSlice";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(renderPosts())
  }, [])

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
          <EventCard className="event-cards" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
