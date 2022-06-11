import React, { useState } from "react";
import { EventForm, EventCard } from "../../components";

const NotFoundPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div>NotFoundPage</div>
      <div className="homepage-section">
        <div className="eventform-parent-container">
          <button
            className="openModalBtn"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Create an event
          </button>
          {modalOpen && <EventForm setOpenModal={setModalOpen} />}
        </div>
        <div className="eventrender-container">
          <EventCard />
        </div>
        : <h1>...</h1>
      </div>
      
    </>
  );
};
export default NotFoundPage;
