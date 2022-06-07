import React, { useState, useEffect } from "react";

import { Footer, Navbar, EventForm, EventCard } from "../../components";
import { renderPosts, postsResult } from "../../reducers/mainSlice";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect( () => {
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

        {getPosts.status === 200 &&
                  getPosts.data.results.map(( {props} , idx) => (
                    <EventCard className="event-cards" props={props} key={idx}/>
        ))}

        {getPosts.status === 204 && 
                              <h1>There are no posts to display</h1>}
        </div>
 : <h1>...</h1>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
