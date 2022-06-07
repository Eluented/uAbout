import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Button } from "@mui/material";
import { createPostAction } from "../../actions";

// import ReactDOM from "react-dom/client";

function EventForm({ setOpenModal }) {
  const [post_title, setPost_Title] = useState("");
  const [post_body, setPost_Body] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dispatch = useDispatch();

  function createPost(e) {
    const postData = {
      post_title,
      post_body,
      startDate,
      endDate,
    };
    console.log(postData);
    dispatch(createPostAction(postData));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="form-container">
        <div>
          <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
            X
          </button>
        </div>
        <form
          id="event-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            className="input-fields"
            id="outlined-event-name"
            label="Event Name"
            value={post_title}
            onChange={(e) => setPost_Title(e.target.value)}
            required
          />
          <br />
          <div className="date-container">
            <label>
              Start Date:
              <DatePicker
                className="date-input-field"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                required
              />
            </label>
            <label>
              End Date:
              <DatePicker
                className="date-input-field"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </label>
          </div>
          <TextField
            className="input-fields"
            id="outlined-body-input"
            label="Event Details"
            value={post_body}
            onChange={(e) => setPost_Body(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            id="post-btn"
            type="submit"
            onClick={() => {
              createPost();
              setOpenModal(false);
            }}
          >
            Post
          </Button>
        </form>
      </div>
    </>
  );
}

export default EventForm;
