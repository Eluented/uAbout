import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { eventPost } from "../../reducers/mainSlice";

// import ReactDOM from "react-dom/client";

function EventForm({ setOpenModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    post_title: "",
    post_body:  ""
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(eventPost(event));
  };

  const event = {
    title: formData.post_title,
    body: formData.post_body,
    start_date: startDate.toString(),
    end_date: endDate.toString()
  };

  console.log(event)
  
  return (
    <>
      <div className="form-container">
        <div>
          <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
            x
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
            value={formData.post_title}
            onChange={(e) => handleChange(e)}
            name="post_title"
          />{" "}
          <br />
          <div className="date-container">
            <label>
              Start Date:
              <DatePicker
                className="date-input-field"
                onChange={(date) => setStartDate(date)}
                selected={startDate}
                name="start_date"
              />
            </label>
            <label>
              End Date:
              <DatePicker
                className="date-input-field"
                onChange={(date) => setEndDate(date)}
                selected={endDate}
                name="end_date"
              />
            </label>
          </div>
          <TextField
            className="input-fields"
            id="outlined-body-input"
            label="Event Details"
            value={formData.post_body}
            onChange={(e) => handleChange(e)}
            name="post_body"
          />
          <br />
          <Button
            variant="contained"
            id="post-btn"
            type="submit"
          >
            Post
          </Button>
        </form>
      </div>
    </>
  );
}

export default EventForm;
