import React from "react";

import { Footer, Navbar, PostForm } from "../../components";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Navbar />
      <div className="homepage-section">
        <div className="postform-container">
          <PostForm />
        </div>
        <div className="postrender-container"></div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
