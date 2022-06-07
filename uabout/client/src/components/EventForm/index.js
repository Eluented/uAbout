import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Button } from "@mui/material";

// import ReactDOM from "react-dom/client";

function EventForm({ setOpenModal }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [form, setFormValue] = useState({
    post_title: " ",
    post_body: " ",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    return e.preventDefault();
  };

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
            value={form.post_title}
            onChange={handleChange}
          />{" "}
          <br />
          <div className="date-container">
            <label>
              Start Date:
              <DatePicker
                className="date-input-field"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
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
            value={form.post_body}
            onChange={handleChange}
          />
          <br />
          <Button
            variant="contained"
            id="post-btn"
            type="submit"
            onClick={() => {
              handleSubmit();
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
