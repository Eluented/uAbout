import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import ReactDOM from "react-dom/client";

function EventForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [form, setFormValue] = useState({
    post_title: "",
    post_body: "",
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
      <h2>Create an event!</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            id="event-name-input"
            type="text"
            placeholder="Event name"
            name="post_title"
            value={form.post_title}
            onChange={handleChange}
          />
          <br />
          <label>
            Start Date:
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </label>
          <label>
            End Date:
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </label>
          <input
            id="event-body-input"
            type="text"
            placeholder="Event Details"
            name="post_body"
            value={form.post_body}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Post
          </button>
        </form>
      </div>
    </>
  );
}

export default EventForm;
