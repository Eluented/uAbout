import React, { useState } from "react";
// import ReactDOM from "react-dom/client";

function PostForm() {
  const [form, setFormValue] = useState({
    post_title: "",
    post_body: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("It works!");
  };

  return (
    <>
      <h2>Create an event!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event name"
          name="post_title"
          value={form.post_title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder=""
          name="post_body"
          value={form.post_body}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Post
        </button>
      </form>
    </>
  );
}

export default PostForm;
